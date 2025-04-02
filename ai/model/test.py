import cv2
import time
import torch
import numpy as np
from torchvision import transforms
from ultralytics import YOLO
from PIL import Image, ImageDraw, ImageFont
from visitor_detect import MultiTaskEfficientNet

# Device 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 얼굴 전처리 transform
face_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# 연령대 라벨 매핑
group_names = {0: "0~10", 1: "10~20", 2: "20~30", 3: "30~40", 4: "40~50", 5: "50+"}

# YOLOv8 얼굴 감지 모델 로드
face_detector = YOLO("/Users/seongjeongkyu/capstone-2025-10/ai/model/yolov8n-face.pt")

# MultiTaskEfficientNet 모델 로드
model = MultiTaskEfficientNet(num_gender_classes=2, num_age_groups=6)
checkpoint_path = "/Users/seongjeongkyu/capstone-2025-10/ai/model/model_checkpoint.pt"  # 실제 경로로 수정
model.load_state_dict(torch.load(checkpoint_path, map_location=device))
model.to(device)
model.eval()

# 방문자 추적 관련 변수
tracked_visitors = {}
TRACKING_THRESHOLD = 50  # 픽셀 단위, 얼굴 중심 좌표 차이 임계값
MIN_VISIT_DURATION = 30  # 방문으로 간주하는 최소 지속 시간 (초)
EXPIRE_TIME = 60         # 방문자가 60초 이상 보이지 않으면 삭제

def get_face_center(box):
    x1, y1, x2, y2 = box
    return ((x1 + x2) // 2, (y1 + y2) // 2)

def is_same_visitor(center, tracked_center, threshold=TRACKING_THRESHOLD):
    dx = center[0] - tracked_center[0]
    dy = center[1] - tracked_center[1]
    return np.sqrt(dx**2 + dy**2) < threshold

def process_frame(frame, face_detector, model, transform, device, tracked_visitors):
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)
    draw = ImageDraw.Draw(pil_img)
    current_time = time.time()

    # 얼굴 감지
    results = face_detector(img_rgb)
    detected_faces = []
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy()
        confidences = result.boxes.conf.cpu().numpy()
        for box, conf in zip(boxes, confidences):
            if conf < 0.5:
                continue
            x1, y1, x2, y2 = box.astype(int)
            detected_faces.append({
                "box": (x1, y1, x2, y2),
                "center": get_face_center((x1, y1, x2, y2))
            })

    # 방문자 트래킹
    for face in detected_faces:
        center = face["center"]
        matched_id = None
        for visitor_id, info in tracked_visitors.items():
            if is_same_visitor(center, info["center"]):
                matched_id = visitor_id
                break
        if matched_id is None:
            # 새 방문자: 모델 추론 실행
            x1, y1, x2, y2 = face["box"]
            face_crop = pil_img.crop((x1, y1, x2, y2))
            face_input = transform(face_crop).unsqueeze(0).to(device)
            with torch.no_grad():
                gender_logits, age_logits = model(face_input)
                gender_pred = torch.argmax(gender_logits, dim=1).item()
                age_pred = torch.argmax(age_logits, dim=1).item()
            new_id = f"{current_time}_{center[0]}_{center[1]}"
            tracked_visitors[new_id] = {
                "center": center,
                "start_time": current_time,
                "last_seen": current_time,
                "gender": gender_pred,
                "age_group": age_pred
            }
            matched_id = new_id
        else:
            # 기존 방문자: 정보 업데이트
            tracked_visitors[matched_id]["last_seen"] = current_time

        # 화면에 박스 및 예측 결과 그리기
        pred = tracked_visitors[matched_id]
        gender_label = "Male" if pred["gender"] == 1 else "Female"
        age_label = group_names.get(pred["age_group"], "Unknown")
        label_text = f"{gender_label}, {age_label}"
        x1, y1, x2, y2 = face["box"]
        draw.rectangle((x1, y1, x2, y2), outline="red", width=2)
        draw.text((x1, y1 - 20), label_text, fill="red")

    # 오래 보이지 않는 방문자 삭제
    for visitor_id in list(tracked_visitors.keys()):
        if current_time - tracked_visitors[visitor_id]["last_seen"] > EXPIRE_TIME:
            del tracked_visitors[visitor_id]

    return np.array(pil_img)

# 실시간 영상 처리
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret:
        break
    processed_frame = process_frame(frame, face_detector, model, face_transform, device, tracked_visitors)
    cv2.imshow("Visitor Tracking", processed_frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break