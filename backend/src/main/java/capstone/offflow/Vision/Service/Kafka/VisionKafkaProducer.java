package capstone.offflow.Vision.Service.Kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/**
 * Producer : Kafka Topic에서 Data를 생성하는 역할
 * Topic : Kafka가 데이터를 모아두는 채널 같은 것
 * Kafka Topic에 메세지 전송
 */

@Service
@RequiredArgsConstructor
public class VisionKafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    /**
     * KafkaMessageWrapper를 Json 문자열로 변환한 후 Kafka로 발송
     */
    public void sendVisionData(KafkaMessageWrapper wrapper) {
        try{
            //DTO를 Json 문자열로 변환
            String message = objectMapper.writeValueAsString(wrapper);

            //Kafka 토픽에 메세지 전송
            kafkaTemplate.send("vision-data-topic", message);
        } catch (Exception e){
            throw new RuntimeException("Failed to send message to kafka", e);
        }
    }
}
