package capstone.offflow.Vision.Service.Redis;


import capstone.offflow.Vision.Domain.GenderAge;
import capstone.offflow.Vision.Domain.Heatmap;
import capstone.offflow.Vision.Domain.Tracking;
import capstone.offflow.Vision.Repository.GenderAgeRepository;
import capstone.offflow.Vision.Repository.HeatmapRepository;
import capstone.offflow.Vision.Repository.TrackingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Type에 맞는 Repository에 데이터 저장
 * Type : GenderAge, Heatmap, Tracking
 */


@Service
@Slf4j
@RequiredArgsConstructor
public class VisionRedisServiceImpl implements VisionRedisService{

    private final RedisTemplate<String, Object> redisTemplate;
    private final HeatmapRepository heatmapRepository;
    private final TrackingRepository trackingRepository;
    private final GenderAgeRepository genderAgeRepository;


    //Redis에 데이터 넣는 Method
    public void cacheData(String key, Object data){
        if (data instanceof Tracking tracking) {
            // Redis Sorted Set에 시간 기준 저장
            long timestamp = tracking.getDetectedTime().getTime();
            redisTemplate.opsForZSet().add("tracking_data", tracking, timestamp);
        } else {
            // 기존 Heatmap, GenderAge는 리스트 방식 유지
            redisTemplate.opsForList().leftPush(key, data);
        }
    }

    //Redis -> DB로 flush하는 Method -> Vision
    //5분마다 스케줄러가 호출
    //Type에 맞는 Repository에 저장
    @Override
    public void flushCacheToDatabase() {
        flushType("heatmap", Heatmap.class, heatmapRepository);
        flushType("tracking", Tracking.class, trackingRepository);
        flushType("genderAge", GenderAge.class, genderAgeRepository);
    }

    /**
     * 1000개로 Batch 저장 -> 너무많은 데이터를 한번에 저장시 메모리 터질가능성있음
     * 성능 최적화 위함
     */
    private <T> void flushType(String redisKey, Class<T> clazz, JpaRepository<T, Long> repository) {
        List<Object> objects = redisTemplate.opsForList().range(redisKey, 0, -1);
        if (objects != null && !objects.isEmpty()) {
            List<T> entities = objects.stream()
                    .map(obj -> clazz.cast(obj))
                    .collect(Collectors.toList());

            int batchSize = 1000;
            for (int i = 0; i < entities.size(); i += batchSize) {
                int end = Math.min(i + batchSize, entities.size());
                List<T> batch = entities.subList(i, end);
                try {
                    repository.saveAll(batch);
                } catch (Exception e) {
                    log.error("❌ Failed to save batch for redisKey {}: {}", redisKey, e.getMessage());
                }
            }
            redisTemplate.delete(redisKey); //저장 완료 후 Redis 데이터 삭제
        }
    }

    // 2시간 ~ 최근 1시간 데이터 저장
    @Override
    public void flushOldTrackingData() {
        long now = System.currentTimeMillis();
        long oneHourAgo = now - (60 * 60 * 1000);
        long twoHoursAgo = now - (2 * 60 * 60 * 1000);

        var trackings = redisTemplate.opsForZSet()
                .rangeByScore("tracking_data", twoHoursAgo, oneHourAgo);

        if (trackings == null || trackings.isEmpty()) {
            log.info("📭 [Tracking] No data to flush (2h~1h)");
            return;
        }

        try {
            List<Tracking> trackingList = trackings.stream()
                    .map(obj -> (Tracking) obj)
                    .collect(Collectors.toList());

            trackingRepository.saveAll(trackingList);
            log.info("📥 [Tracking] Flushed {} records to DB", trackingList.size());

            // Redis에서 삭제
            redisTemplate.opsForZSet().removeRangeByScore("tracking_data", twoHoursAgo, oneHourAgo);
            log.info("🗑️ [Tracking] Deleted flushed data from Redis");

        } catch (Exception e) {
            log.error("❌ [Tracking] Error while flushing data: {}", e.getMessage());
        }
    }
}
