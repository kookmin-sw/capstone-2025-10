
import base64
import json
import time

import cv2
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers='192.168.110.252:9092',  # Kafka 브로커 주소
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

camera_id = "CAM001"
dashboard_id = 1
cap = cv2.VideoCapture("rtsp://offflow:offflow1234@192.168.110.208:554/stream1")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue

    print(frame)
    _, buffer = cv2.imencode('.jpg', frame)
    b64img = base64.b64encode(buffer).decode('utf-8')
    # print(b64img)

    message = {
        "cameraId": camera_id,
        "dashboardId": dashboard_id,
        "timestamp": int(time.time() * 1000),
        "image": b64img
    }

    producer.send('vision-frame-topic', message)
    time.sleep(0.01)  # 1초 간격 (fps 조절)

cap.release()
producer.flush()
