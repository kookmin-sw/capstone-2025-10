package capstone.offflow.Vision.Service.Business;


import capstone.offflow.Vision.Service.Kafka.KafkaMessageWrapper;

/**
 * Vision server로부터 받는 데이터 분류
 * Type : GenderAge, Heatmap, Tracking
 * Redis에 저장
 */
public interface VisionDataService {

    void processIncomingData(KafkaMessageWrapper wrapper);

//    void persistDataFromRedis();

    void flushTrackingByTimeRange(); // ZSet 기반 시간 조건 flush
    void flushOtherVisionData();     // 기존 List 방식 flush
}
