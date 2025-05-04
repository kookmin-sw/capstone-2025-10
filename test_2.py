from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
    bootstrap_servers='192.168.0.7:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

message = {
    "type": "tracking",
    "payload": {
        "dashboardId": 1,
        "detectedTime": int(time.time() * 1000),  # 현재시간 밀리초
        "visitorLabel": "visitor_1",
        "gridList": "[[5,6],[7,8],[9,10]]"  # 문자열 형태로
    }
}

producer.send("vision-data-topic", message)
producer.flush()
