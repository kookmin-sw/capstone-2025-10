from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='192.168.219.120:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

message = {
    "type": "genderAge",
    "payload": {
        "dashboardId": 1,
        "visitorLabel": "employee",
        "gender": "male",
        "age": "30"
    }
}

producer.send("vision-data-topic", message)
producer.flush()
