import cv2
import torch
import numpy as np
from torchvision import transforms

from models import build_model
from config import cfg as base_cfg, merge_from_file

# 1. 이미지 전처리
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# 2. 모델 불러오기 함수
def load_model(cfg_path, weight_path):
    cfg = merge_from_file(base_cfg, cfg_path)
    cfg.TEST.WEIGHT = weight_path
    cfg.test = True

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = build_model(cfg=cfg, training=False)
    model.to(device)
    model.eval()

    # 가중치 불러오기
    state_dict = torch.load(weight_path, map_location='cpu')
    model.load_state_dict(state_dict)

    return model, cfg, device

# 3. 단일 이미지 추론 (좌표 복원 방식)
@torch.no_grad()
def infer_image(model, device, image_path, threshold=0.5, save_path='output.jpg'):
    # 이미지 읽기
    image_bgr = cv2.imread(image_path)
    orig_h, orig_w = image_bgr.shape[:2]

    # 전처리용 RGB 이미지 생성 및 리사이즈 (512x512)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    image_rgb_resized = cv2.resize(image_rgb, (512, 512))
    input_tensor = transform(image_rgb_resized).unsqueeze(0).to(device)

    # 모델 추론
    output = model(input_tensor)
    scores = torch.nn.functional.softmax(output['pred_logits'], -1)[0, :, 1]
    points = output['pred_points'][0][scores > threshold].detach().cpu().numpy()

    # 예측된 좌표를 원래 이미지 사이즈로 복원
    scale_x = orig_w / 512
    scale_y = orig_h / 512
    points[:, 0] *= scale_x
    points[:, 1] *= scale_y

    # 결과 시각화
    for (x, y) in points:
        cv2.circle(image_bgr, (int(x), int(y)), 4, (0, 255, 0), -1)
    cv2.putText(image_bgr, f"Count: {len(points)}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    # 저장
    cv2.imwrite(save_path, image_bgr)
    print(f"[✅] Saved: {save_path} | Count: {len(points)}")

if __name__ == '__main__':
    model, cfg, device = load_model('./configs/SHHA_test.yml', './output/SHHA_best.pth')
    infer_image(
        model=model,
        device=device,
        image_path='B3.jpg',   # 입력 이미지 경로
        threshold=0.5,
        save_path='output_result.jpg'
    )
