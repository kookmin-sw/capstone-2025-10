from kafka import KafkaProducer
import json
import cv2
import time
import torch
import numpy as np
from ultralytics import YOLO
from PIL import Image, ImageDraw, ImageFont
from torchvision import transforms
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

# YOLOv8 얼굴 감지 모델 로드 (얼굴 전용 모델)
face_detector = YOLO("./yolov8n-face.pt")

# MultiTaskEfficientNet 모델 로드 (체크포인트 사용)
model = MultiTaskEfficientNet(num_gender_classes=2, num_age_groups=6)
checkpoint_path = "./model_checkpoint.pt"
model.load_state_dict(torch.load(checkpoint_path, map_location=device))
model.to(device)
model.eval()

# 방문자(객체) 추적을 위한 간단한 딕셔너리
tracked_visitors = {}  # key: visitor_id, value: dict with center, start_time, last_seen, predictions
TRACKING_THRESHOLD = 75  # 픽셀 단위, 중심 좌표 차이 임계값
MIN_DETECTION_DURATION = 10  # 10초 이상 머무른 방문자에 대해 서버에 전송
EXPIRE_TIME = 60  # 60초 이상 보이지 않으면 해당 방문자 삭제

def get_face_center(box):
    x1, y1, x2, y2 = box
    return ((x1 + x2) // 2, (y1 + y2) // 2)

def is_same_visitor(center, tracked_center, threshold=TRACKING_THRESHOLD):
    dx = center[0] - tracked_center[0]
    dy = center[1] - tracked_center[1]
    return np.sqrt(dx**2 + dy**2) < threshold

def request_kafka(message):
    producer = KafkaProducer(
        bootstrap_servers='192.168.219.180:9092',
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    )

    producer.send("vision-data-topic", message)

def send_to_server(visitor_data):
    # 실제 서버 API 호출 코드 (예: requests.post 등)
    print("Sending data to server:", visitor_data)
    request_kafka({
        "type": "genderAge",
        "payload": {
            "dashboardId": 1,
            "visitorLabel": visitor_data["visitor_id"],
            "gender": visitor_data["gender"],
            "age": visitor_data["age_group"],
        }
    })

# 추적 업데이트 및 검출 실행 함수 (추가: 10프레임마다 YOLO 검출 실행)
def process_frame(frame, face_detector, model, transform, device, tracked_visitors, run_detection=True):
    # frame: OpenCV BGR 이미지
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)
    draw = ImageDraw.Draw(pil_img)
    current_time = time.time()

    detected_faces = []
    if run_detection:
        # YOLO 얼굴 감지 실행
        results = face_detector(img_rgb, verbose=False)
        for result in results:
            boxes = result.boxes.xyxy.cpu().numpy()
            confidences = result.boxes.conf.cpu().numpy()
            for box, conf in zip(boxes, confidences):
                if conf < 0.5:
                    continue
                x1, y1, x2, y2 = box.astype(int)
                # 마진 추가 (10%)
                w = x2 - x1
                h = y2 - y1
                margin = 0.1
                new_x1 = max(0, int(x1 - margin * w))
                new_y1 = max(0, int(y1 - margin * h))
                new_x2 = int(x2 + margin * w)
                new_y2 = int(y2 + margin * h)
                detected_faces.append({
                    "box": (new_x1, new_y1, new_x2, new_y2),
                    "center": get_face_center((new_x1, new_y1, new_x2, new_y2))
                })

    # 트래킹: 새로운 객체에 대해서만 모델 추론 실행
    for face in detected_faces:
        center = face["center"]
        matched_id = None
        for visitor_id, info in tracked_visitors.items():
            if is_same_visitor(center, info["center"]):
                matched_id = visitor_id
                break
        if matched_id is None:
            # 새로운 방문자: 모델 추론 실행
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
                "box": face["box"],
                "start_time": current_time,
                "last_seen": current_time,
                "gender": gender_pred,
                "age_group": age_pred,
                "data_sent": False
            }
            matched_id = new_id
        else:
            # 기존 방문자: 정보 업데이트 (좌표 스무딩 적용)
            old_center = tracked_visitors[matched_id]["center"]
            new_center = face["center"]
            smoothed_center = ((old_center[0] + new_center[0]) // 2,
                               (old_center[1] + new_center[1]) // 2)
            tracked_visitors[matched_id]["center"] = smoothed_center
            tracked_visitors[matched_id]["last_seen"] = current_time
            tracked_visitors[matched_id]["box"] = face["box"]

    if run_detection:
        for visitor_id in list(tracked_visitors.keys()):
            if tracked_visitors[visitor_id]["last_seen"] < current_time:
                del tracked_visitors[visitor_id]

    # 시각화: 방문자들의 박스와 라벨 표시 (모델 추론은 최초 한번만)
    for visitor_id, info in tracked_visitors.items():
        gender_label = "Male" if info["gender"] == 1 else "Female"
        age_label = group_names.get(info["age_group"], "Unknown")
        label_text = f"{gender_label}, {age_label}, {visitor_id}"
        box = info["box"]
        draw.rectangle(box, outline="red", width=2)
        draw.text((box[0], box[1] - 20), label_text, fill="red")

    # 방문자 처리: 30초 이상 머문 방문자는 서버 전송, 60초 이상 보이지 않으면 삭제
    for visitor_id in list(tracked_visitors.keys()):
        duration = current_time - tracked_visitors[visitor_id]["start_time"]
        if duration >= MIN_DETECTION_DURATION and not tracked_visitors[visitor_id]["data_sent"]:
            visitor_data = {
                "visitor_id": visitor_id,
                "gender": "Male" if tracked_visitors[visitor_id]["gender"] == 1 else "Female",
                "age_group": group_names.get(tracked_visitors[visitor_id]["age_group"], "Unknown"),
                "duration": duration
            }
            send_to_server(visitor_data)
            tracked_visitors[visitor_id]["data_sent"] = True
        if current_time - tracked_visitors[visitor_id]["last_seen"] > EXPIRE_TIME:
            del tracked_visitors[visitor_id]

    return np.array(pil_img)

# 메인 루프: 실시간 영상 처리 및 시각화
cap = cv2.VideoCapture("rtsp://offflow:offflow1234@192.168.219.188/stream1")
frame_count = 0
DETECTION_INTERVAL = 10  # 10프레임마다 YOLO 검출 실행

while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame_count += 1

    # YOLO 검출은 매 DETECTION_INTERVAL 프레임마다 수행
    if frame_count % DETECTION_INTERVAL == 0:
        processed_frame = process_frame(frame, face_detector, model, face_transform, device, tracked_visitors, run_detection=True)
    else:
        # 이전 검출 결과(트래킹)만 업데이트: run_detection=False이면 새 검출은 수행하지 않고, 기존 방문자 정보만 업데이트 
        processed_frame = process_frame(frame, face_detector, model, face_transform, device, tracked_visitors, run_detection=False)

    processed_frame_bgr = cv2.cvtColor(processed_frame, cv2.COLOR_RGB2BGR)
    cv2.imshow("Real-Time Visitor Tracking", processed_frame_bgr)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
