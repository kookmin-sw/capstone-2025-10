package capstone.offflow.Vision.Service.Business;

import capstone.offflow.Vision.Service.Kafka.KafkaMessageWrapper;
import capstone.offflow.Vision.Service.Redis.VisionRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class VisionDataServiceImpl implements VisionDataService{

    private final VisionRedisService visionRedisService;

    /**
     * Vision data의 타입별로 Redis에 캐시 저장
     */
    @Override
    public void processIncomingData(KafkaMessageWrapper wrapper) {
        String type = wrapper.getType();

        //type별로 분기해서 Redis에 저장
        switch (type){
            case "heatmap":
                visionRedisService.cacheData("heatmap", wrapper.getPayload());
                break;
            case "tracking":
                visionRedisService.cacheData("tracking", wrapper.getPayload());
                break;
            case "genderAge":
                visionRedisService.cacheData("genderAge", wrapper.getPayload());
                break;
            default:
                throw new IllegalArgumentException("Unknown Vision Data Type: " + type);
        }

    }

    @Override
    public void persistDataFromRedis() {
        //Redis에 쌓이 데이터를 읽어서 DB로 저장
        visionRedisService.flushCacheToDatabase();
    }
}
