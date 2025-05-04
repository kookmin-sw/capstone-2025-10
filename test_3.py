from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
    bootstrap_servers='192.168.0.7:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

message = {
    "type": "heatmap",
    "payload": {
        "dashboardId": 1,
        "detectedTime": int(time.time() * 1000),  # 현재시간 밀리초
        "gridList": "[[1,2],[2,3],[3,4]]"  # 문자열 형태로
    }
}

producer.send("vision-data-topic", message)
producer.flush()
