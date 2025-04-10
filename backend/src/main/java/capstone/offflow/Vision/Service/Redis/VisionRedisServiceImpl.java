package capstone.offflow.Vision.Service.Redis;


import capstone.offflow.Vision.Domain.GenderAge;
import capstone.offflow.Vision.Domain.Heatmap;
import capstone.offflow.Vision.Domain.Tracking;
import capstone.offflow.Vision.Repository.GenderAgeRepository;
import capstone.offflow.Vision.Repository.HeatmapRepository;
import capstone.offflow.Vision.Repository.TrackingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VisionRedisServiceImpl implements VisionRedisService{

    private final RedisTemplate<String, Object> redisTemplate;
    private final HeatmapRepository heatmapRepository;
    private final TrackingRepository trackingRepository;
    private final GenderAgeRepository genderAgeRepository;


    //Redis에 데이터 넣는 Method
    public void cacheData(String key, Object data){
        redisTemplate.opsForList().leftPush(key, data);
    }

    //Redis -> DB로 flush하는 Method

    @Override
    public void flushCacheToDatabase() {
        flushType("heatmap", Heatmap.class, heatmapRepository);
        flushType("tracking", Tracking.class, trackingRepository);
        flushType("genderAge", GenderAge.class, genderAgeRepository);
    }

    private <T> void flushType(String redisKey, Class<T> clazz, org.springframework.data.jpa.repository.JpaRepository<T, Long> repository) {
        List<Object> objects = redisTemplate.opsForList().range(redisKey, 0, -1);
        if (objects != null && !objects.isEmpty()) {
            List<T> entities = objects.stream()
                    .map(obj -> clazz.cast(obj)) // 캐스팅
                    .collect(Collectors.toList());
            repository.saveAll(entities);
            redisTemplate.delete(redisKey); // 저장 완료 후 Redis 비우기
        }
    }
}
