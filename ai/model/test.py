from kafka import KafkaConsumer, KafkaProducer
import json
import cv2
import time
import torch
import numpy as np
from ultralytics import YOLO
from PIL import Image, ImageDraw
from torchvision import transforms
from visitor_detect import MultiTaskEfficientNet
import io

# Kafka Consumer 설정
consumer = KafkaConsumer(
    'video-frame-topic',  # 프레임을 받는 토픽 이름
    bootstrap_servers='192.168.33.162:9092',
    value_deserializer=lambda m: m,
    auto_offset_reset='latest',
    enable_auto_commit=True,
    group_id='offflow-frame-consumer'
)

# Kafka Producer 설정
producer = KafkaProducer(
    bootstrap_servers='192.168.33.162:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
)

# 디바이스 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Transform
face_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

group_names = {0: "0~10", 1: "10~20", 2: "20~30", 3: "30~40", 4: "40~50", 5: "50+"}

# 모델 불러오기
face_detector = YOLO("./yolov8n-face.pt")
model = MultiTaskEfficientNet(num_gender_classes=2, num_age_groups=6)
model.load_state_dict(torch.load("./model_checkpoint.pt", map_location=device))
model.to(device)
model.eval()

# 방문자 추적용 상태
tracked_visitors = {}
TRACKING_THRESHOLD = 75
MIN_DETECTION_DURATION = 10
EXPIRE_TIME = 60

def get_face_center(box):
    x1, y1, x2, y2 = box
    return ((x1 + x2) // 2, (y1 + y2) // 2)

def is_same_visitor(center, tracked_center, threshold=TRACKING_THRESHOLD):
    dx = center[0] - tracked_center[0]
    dy = center[1] - tracked_center[1]
    return np.sqrt(dx**2 + dy**2) < threshold

def send_to_server(visitor_data):
    print("Sending to Kafka:", visitor_data)
    producer.send("vision-data-topic", {
        "type": "genderAge",
        "payload": {
            "dashboardId": 1,
            "visitorLabel": visitor_data["visitor_id"],
            "gender": visitor_data["gender"],
            "age": visitor_data["age_group"],
        }
    })

def process_frame(frame, run_detection=True):
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)
    draw = ImageDraw.Draw(pil_img)
    current_time = time.time()

    detected_faces = []
    if run_detection:
        results = face_detector(img_rgb, verbose=False)
        for result in results:
            boxes = result.boxes.xyxy.cpu().numpy()
            confidences = result.boxes.conf.cpu().numpy()
            for box, conf in zip(boxes, confidences):
                if conf < 0.5:
                    continue
                x1, y1, x2, y2 = box.astype(int)
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

    for face in detected_faces:
        center = face["center"]
        matched_id = None
        for visitor_id, info in tracked_visitors.items():
            if is_same_visitor(center, info["center"]):
                matched_id = visitor_id
                break
        if matched_id is None:
            x1, y1, x2, y2 = face["box"]
            face_crop = pil_img.crop((x1, y1, x2, y2))
            face_input = face_transform(face_crop).unsqueeze(0).to(device)
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
            old_center = tracked_visitors[matched_id]["center"]
            new_center = face["center"]
            smoothed_center = ((old_center[0] + new_center[0]) // 2,
                               (old_center[1] + new_center[1]) // 2)
            tracked_visitors[matched_id]["center"] = smoothed_center
            tracked_visitors[matched_id]["last_seen"] = current_time
            tracked_visitors[matched_id]["box"] = face["box"]

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

# Kafka로부터 프레임 수신 및 처리
print("🎥 Kafka Consumer 시작됨...")
frame_count = 0
DETECTION_INTERVAL = 5

for message in consumer:
    try:
        byte_data = message.value
        nparr = np.frombuffer(byte_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            continue

        frame_count += 1
        run_detection = frame_count % DETECTION_INTERVAL == 0
        result_frame = process_frame(frame, run_detection=run_detection)

        # 시각화 (선택)
        show_frame = cv2.cvtColor(result_frame, cv2.COLOR_RGB2BGR)
        cv2.imshow("Kafka Frame", show_frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    except Exception as e:
        print(f"[ERROR] {e}")

cv2.destroyAllWindows()
