import cv2
import time
import torch
import numpy as np
from torchvision import transforms
from ultralytics import YOLO
from PIL import Image, ImageDraw, ImageFont
from visitor_detect import MultiTaskEfficientNet  # 귀하의 모델 클래스

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
face_detector = YOLO("/Users/seongjeongkyu/capstone-2025-10/ai/model/yolov8n-face.pt")

# MultiTaskEfficientNet 모델 로드 (저장된 checkpoint 사용)
model = MultiTaskEfficientNet(num_gender_classes=2, num_age_groups=6)
checkpoint_path = "/Users/seongjeongkyu/capstone-2025-10/ai/model/model_checkpoint.pt"
model.load_state_dict(torch.load(checkpoint_path, map_location=device))
model.to(device)
model.eval()

# 방문자 추적 관련 변수
tracked_visitors = {}  # key: visitor_id, value: dict with center, box, start_time, last_seen, predictions, data_sent
TRACKING_THRESHOLD = 75  # 방문자 매칭 임계값 (픽셀)
MIN_VISIT_DURATION = 30  # 방문으로 간주하는 최소 지속 시간 (초)
EXPIRE_TIME = 60         # 방문자가 60초 이상 보이지 않으면 삭제

def get_face_center(box):
    x1, y1, x2, y2 = box
    return ((x1 + x2) // 2, (y1 + y2) // 2)

def is_same_visitor(center, tracked_center, threshold=TRACKING_THRESHOLD):
    dx = center[0] - tracked_center[0]
    dy = center[1] - tracked_center[1]
    return np.sqrt(dx**2 + dy**2) < threshold

def send_to_server(visitor_data):
    # 실제 서버 API 호출 코드를 여기에 작성 (예: requests.post())
    print("Sending data to server:", visitor_data)

def process_frame(frame, face_detector, model, transform, device, tracked_visitors):
    # frame: OpenCV BGR 이미지
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)
    draw = ImageDraw.Draw(pil_img)
    current_time = time.time()
   
    # YOLO 얼굴 감지
    results = face_detector(img_rgb)
    detected_faces = []
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy()  # 각 박스: [x1, y1, x2, y2]
        confidences = result.boxes.conf.cpu().numpy()
        for box, conf in zip(boxes, confidences):
            if conf < 0.5:
                continue
            x1, y1, x2, y2 = box.astype(int)
            # 마진 추가 (10% 마진)
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
    
    # 방문자 트래킹 및 분류
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
                "box": face["box"],
                "start_time": current_time,
                "last_seen": current_time,
                "gender": gender_pred,
                "age_group": age_pred,
                "data_sent": False
            }
            matched_id = new_id
        else:
            # 기존 방문자: 정보 업데이트 (예: 중심 좌표와 박스 업데이트)
            tracked_visitors[matched_id]["last_seen"] = current_time
            # Optionally, 평균 내거나 박스 업데이트 (여기서는 현재 감지된 박스를 유지)
            tracked_visitors[matched_id]["center"] = center
            tracked_visitors[matched_id]["box"] = face["box"]

        # 화면에 박스 및 라벨 그리기 (이미 추론된 결과 사용)
        pred = tracked_visitors[matched_id]
        gender_label = "Male" if pred["gender"] == 1 else "Female"
        age_label = group_names.get(pred["age_group"], "Unknown")
        label_text = f"{gender_label}, {age_label}"
        x1, y1, x2, y2 = tracked_visitors[matched_id]["box"]
        draw.rectangle((x1, y1, x2, y2), outline="red", width=2)
        draw.text((x1, y1 - 20), label_text, fill="red")
    
    # 방문자 처리: 30초 이상 머문 방문자는 서버 전송, 오래 보이지 않는 방문자는 삭제
    for visitor_id in list(tracked_visitors.keys()):
        duration = current_time - tracked_visitors[visitor_id]["start_time"]
        if duration >= MIN_VISIT_DURATION and not tracked_visitors[visitor_id]["data_sent"]:
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
cap = cv2.VideoCapture(0)
last_process_time = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    current_time = time.time()
    # 1초에 한 번만 처리 (추가 프레임은 화면에 출력만)
    if current_time - last_process_time >= 1:
        processed_frame = process_frame(frame, face_detector, model, face_transform, device, tracked_visitors)
        last_process_time = current_time
    else:
        processed_frame = frame

    cv2.imshow("Real-Time Visitor Tracking", processed_frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
