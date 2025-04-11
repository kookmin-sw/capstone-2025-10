import cv2
import torch
import numpy as np
import requests
from torchvision import transforms
import torch.nn.functional as F

from models import build_model
from config import cfg as base_cfg, merge_from_file

# -----------------------------
# 1. 전처리 및 패딩 함수
# -----------------------------
def resize_and_pad(image, max_len=1024, block=128):
    """
    image: numpy array, RGB 순서
    max_len: 긴 변의 최대 길이 (상하이텍 데이터셋 1024x768)
    block: 패딩 단위 (APGCC에서는 128 배수)
    
    리사이즈 후 오른쪽과 아래쪽에만 0으로 채운 패딩을 적용하여
    (new_h, new_w)가 block 배수가 되도록 함.
    
    반환:
      - padded_image: 패딩이 적용된 이미지
      - new_size: (new_h, new_w) (리사이즈된 이미지의 실제 크기)
      - orig_size: (orig_h, orig_w) (원본 이미지 크기)
      - scale: 리사이즈 스케일
    """
    orig_h, orig_w = image.shape[:2]
    # 긴 변 기준 스케일 계산 (비율 유지)
    scale = min(max_len / orig_h, max_len / orig_w)
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    image_resized = cv2.resize(image, (new_w, new_h))
    
    # 오른쪽, 아래쪽에만 패딩 적용: APGCC dataset에서는 좌측 상단 정렬
    pad_h = ((new_h - 1) // block + 1) * block - new_h
    pad_w = ((new_w - 1) // block + 1) * block - new_w
    padded_image = np.zeros((new_h + pad_h, new_w + pad_w, 3), dtype=image_resized.dtype)
    padded_image[:new_h, :new_w, :] = image_resized
    
    return padded_image, (new_h, new_w), (orig_h, orig_w), scale

# -----------------------------
# 2. 모델 로딩 함수 (APGCC 방식)
# -----------------------------
def load_model(cfg_path, weight_path):
    cfg = merge_from_file(base_cfg, cfg_path)
    cfg.TEST.WEIGHT = weight_path
    cfg.test = True

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = build_model(cfg=cfg, training=False)
    model.to(device)
    model.eval()

    state_dict = torch.load(weight_path, map_location='cpu')
    model.load_state_dict(state_dict)
    return model, cfg, device

# -----------------------------
# 3. 좌표 전송 함수
# -----------------------------
def send_coordinates(points, server_url):
    """
    points: numpy 배열 (N,2)의 형태, 원본 이미지 좌표
    server_url: 좌표 데이터를 전송할 서버의 엔드포인트 URL
    """
    # numpy 배열을 리스트로 변환하여 전송
    payload = {"points": points.tolist()}
    try:
        response = requests.post(server_url, json=payload)
        if response.status_code == 200:
            print("좌표 전송 성공")
        else:
            print(f"좌표 전송 실패, 상태 코드: {response.status_code}")
    except Exception as e:
        print(f"좌표 전송 중 오류 발생: {e}")

# -----------------------------
# 4. 추론 및 원본 복원 함수 (좌표 전송 포함)
# -----------------------------
# transform: APGCC에서 사용하는 ToTensor + Normalize
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

@torch.no_grad()
def inference_and_restore(model, device, image_path, threshold=0.5, save_path='output_result.jpg', server_url=None):
    """
    이미지 파일을 읽어 APGCC 전처리 과정(리사이즈 + 패딩)을 적용하고 모델 추론,
    예측된 포인트들을 원본 이미지 좌표로 복원한 후 결과 이미지를 저장합니다.
    또한 server_url이 제공되면 해당 좌표들을 서버로 전송합니다.
    """
    # 원본 이미지(BGR) 읽기 및 RGB 변환
    image_bgr = cv2.imread(image_path)
    if image_bgr is None:
        print(f"이미지 파일을 찾을 수 없습니다: {image_path}")
        return
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    
    # 리사이즈 및 패딩 적용
    padded_image, new_size, orig_size, scale = resize_and_pad(image_rgb, max_len=1024, block=128)
    
    # 변환: 이미지를 tensor로 변환 및 normalize (APGCC 학습 시의 처리와 동일)
    input_tensor = transform(padded_image)
    input_tensor = input_tensor.unsqueeze(0).to(device)
    
    # 모델 추론
    output = model(input_tensor)
    # 모델 출력 예시: {'pred_logits': logits, 'pred_points': point 좌표}
    # 여기서, 점수 (softmax 후 클래스 1에 해당하는 값)를 기준으로 threshold 이상인 포인트 선택
    scores = F.softmax(output['pred_logits'], dim=-1)[0, :, 1]
    points = output['pred_points'][0][scores > threshold].detach().cpu().numpy()
    
    # -----------------------------
    # 5. 예측 좌표 복원 과정
    # -----------------------------
    new_h, new_w = new_size
    points[:, 0] = np.clip(points[:, 0], 0, new_w - 1)
    points[:, 1] = np.clip(points[:, 1], 0, new_h - 1)
    # 리사이즈 스케일을 반영해 원본 이미지 좌표로 복원 (패딩은 오른쪽, 아래쪽에만 적용되었으므로 별도 오프셋 없음)
    points[:, 0] /= scale
    points[:, 1] /= scale

    # -----------------------------
    # 6. 시각화 및 좌표 전송
    # -----------------------------
    for (x, y) in points:
        cv2.circle(image_bgr, (int(x), int(y)), 3, (0, 255, 0), -1)
    cv2.putText(image_bgr, f"Count: {len(points)}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    
    cv2.imwrite(save_path, image_bgr)
    print(f"결과 저장: {save_path} | 예측 개수: {len(points)}")
    
    if server_url is None:
        print(points.tolist())

    # 서버 URL이 주어졌다면 좌표 전송
    if server_url is not None:
        send_coordinates(points, server_url)

# -----------------------------
# 7. 메인 실행 예시
# -----------------------------
if __name__ == '__main__':
    # 설정 파일 및 모델 가중치 경로 (APGCC Git의 설정에 맞게 수정)
    cfg_path = './configs/SHHA_test.yml'
    weight_path = './output/SHHA_best.pth'
    
    # 좌표를 전송할 서버 엔드포인트 (실제 서버 주소로 변경)
    server_url = None
    
    model, cfg, device = load_model(cfg_path, weight_path)
    inference_and_restore(
        model=model,
        device=device,
        image_path='B3.jpg',      # 입력 이미지 파일 경로
        threshold=0.5,                     # 예측 점수 threshold
        save_path='output_result.jpg',
        server_url=server_url              # 좌표 전송을 위한 서버 URL
    )
