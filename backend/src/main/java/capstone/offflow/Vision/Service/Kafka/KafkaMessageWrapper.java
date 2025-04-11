package capstone.offflow.Vision.Service.Kafka;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

/**
 * Message Type 분류
 * Type : Heatmap, GenderAge, Tracking
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KafkaMessageWrapper {

    private String type;
    private Map<String, Object> payload;
}
