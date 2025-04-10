package capstone.offflow.Vision.Service.Kafka;

import capstone.offflow.Vision.Service.Business.VisionDataService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

/**
 * Consumer : Kafka Topic에서 Data를 읽는 역할
 * Topic : Kafka가 데이터를 모아두는 채널 같은 것
 */

@Service
@RequiredArgsConstructor
public class VisionKafkaConsumer {

    private final VisionDataService visionDataService;
    private final ObjectMapper objectMapper;

    /**
     * Kafka에서 vision-data-topic를 구독하고, 메세지를 VisionDataService로 전달
     */
    @KafkaListener(topics = "vision-data-topic", groupId = "vision-consumer-group")
    public void consume(String message) {
        try {
            //수신한 문자열 메시지를 DTO로 변환
            KafkaMessageWrapper wrapper = objectMapper.readValue(message, KafkaMessageWrapper.class);

            //VisionDataService를 통해 Redis에 저장 처리
            visionDataService.processIncomingData(wrapper);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
