from kafka import KafkaProducer
import json
import time
import threading
import uuid
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
    orig_h, orig_w = image.shape[:2]
    scale = min(max_len / orig_h, max_len / orig_w)
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    image_resized = cv2.resize(image, (new_w, new_h))

    pad_h = ((new_h - 1) // block + 1) * block - new_h
    pad_w = ((new_w - 1) // block + 1) * block - new_w
    padded_image = np.zeros((new_h + pad_h, new_w + pad_w, 3), dtype=image_resized.dtype)
    padded_image[:new_h, :new_w, :] = image_resized

    return padded_image, (new_h, new_w), (orig_h, orig_w), scale

# -----------------------------
# 2. 모델 로딩
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
# 3. Kafka 전송
# -----------------------------
def request_kafka(points):
    producer = KafkaProducer(
        bootstrap_servers='192.168.219.180:9092',
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    )

    tracking_message = {
       "type": "heatmap",
       "payload": {
           "dashboardId": 1,
           "detectedTime": int(time.time() * 1000),
           "gridList": "[" + ",".join(f"[{int(x)},{int(y)}]" for x, y in points) + "]"
       }
    }

    producer.send("vision-data-topic", tracking_message)

# -----------------------------
# 4. 추론 및 전처리
# -----------------------------
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

@torch.no_grad()
def inference_and_restore(model, device, frame_rgb, threshold=0.5, save_path='output_result.jpg', server_url=None):
    padded_image, new_size, orig_size, scale = resize_and_pad(frame_rgb, max_len=1024, block=128)
    input_tensor = transform(padded_image).unsqueeze(0).to(device)

    output = model(input_tensor)
    scores = F.softmax(output['pred_logits'], dim=-1)[0, :, 1]
    points = output['pred_points'][0][scores > threshold].detach().cpu().numpy()

    new_h, new_w = new_size
    points[:, 0] = np.clip(points[:, 0], 0, new_w - 1)
    points[:, 1] = np.clip(points[:, 1], 0, new_h - 1)
    points[:, 0] /= scale
    points[:, 1] /= scale

    for (x, y) in points:
        cv2.circle(frame_rgb, (int(x), int(y)), 3, (0, 255, 0), -1)
    cv2.putText(frame_rgb, f"Count: {len(points)}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.imwrite(save_path, cv2.cvtColor(frame_rgb, cv2.COLOR_RGB2BGR))
    print(f"결과 저장: {save_path} | 예측 개수: {len(points)}")

    request_kafka(points)

# -----------------------------
# 5. 스트리밍 캡처 루프
# -----------------------------
def get_image():
#     image_path = "./73C3FABD-2202-4AA9-8C89-5644DE33D2C3_1_102_o.jpeg"  # 사용하고자 하는 이미지 경로로 바꿔주세요
#
#     frame = cv2.imread(image_path)
#     crop_width, crop_height = 1920, 1080
#     frame = frame[0:crop_height, 0:crop_width]
#     frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#
#     model, cfg, device = load_model('./configs/SHHA_test.yml', './SHHA_best.pth')
#     name = uuid.uuid4()
#     inference_and_restore(
#         model=model,
#         device=device,
#         frame_rgb=frame_rgb,
#         threshold=0.5,
#         save_path=str(name) + 'output_result.jpg'
#     )
    cap = cv2.VideoCapture("rtsp://offflow:offflow1234@192.168.219.188/stream1")
    if cap.isOpened():
        ret, frame = cap.read()
        if ret:
            crop_width, crop_height = 1920, 1080
            frame = frame[0:crop_height, 0:crop_width]
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            model, cfg, device = load_model('./configs/SHHA_test.yml', './SHHA_best.pth')
            inference_and_restore(
                model=model,
                device=device,
                frame_rgb=frame_rgb,
                threshold=0.5,
                save_path='output_result.jpg'
            )
        cap.release()
    else:
        print("RTSP 스트림 열기 실패")

    threading.Timer(30, get_image).start()

# -----------------------------
# 6. 메인
# -----------------------------
def main():
    get_image()
    while True:
        time.sleep(1)

if __name__ == '__main__':
    main()
