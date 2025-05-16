from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
    bootstrap_servers='192.168.219.160:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

gender_message = {
    "type": "genderAge",
    "payload": {
        "dashboardId": 1,
        "visitorLabel": "employee",
        "gender": "male",
        "age": "30"
    }
}

tracking_message = {
    "type": "tracking",
    "payload": {
        "dashboardId": 1,
        "detectedTime": int(time.time() * 1000),  # 현재시간 밀리초
        "visitorLabel": "visitor_1",
        "gridList": "[[432, 264],[7,8],[9,10]]"  # 문자열 형태로
    }
}

heatmap_message = {
    "type": "heatmap",
    "payload": {
        "dashboardId": 1,
        "detectedTime": int(time.time() * 1000),  # 현재시간 밀리초
        # "gridList": "[[100, 100], [105, 110], [110, 120], [115, 130], [120, 140], [180, 200], [185, 210], [190, 220], [195, 230], [200, 240], [280, 300], [285, 310], [290, 320], [295, 330], [300, 340], [380, 400], [385, 410], [390, 420], [395, 430], [400, 440]]"
    }
}

producer.send("vision-data-topic", heatmap_message)
producer.flush()
