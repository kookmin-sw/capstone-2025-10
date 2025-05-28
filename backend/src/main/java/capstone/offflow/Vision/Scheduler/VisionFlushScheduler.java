package capstone.offflow.Vision.Scheduler;


import capstone.offflow.Vision.Service.Business.VisionDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Redis에 쌓이 데이터를 주기적으로 DB저장하는 Class
 */

@Slf4j
@Component
@RequiredArgsConstructor
public class VisionFlushScheduler {

    private final VisionDataService visionDataService;


    /**
     * 5분마다 Redis에 쌓인 데이터를 DB로 Flush
     * Tracking : 2시간전부터 최근으로부터 1시간 까지 Flush
     * [SCHEDULER] ──► VisionDataService
     *     ├── flushTrackingByTimeRange() ──► ZSet에서 2h~1h 전 Tracking flush + remove
     *     └── flushOtherVisionData() ──────► List에서 heatmap, genderAge flush 후 삭제
     * Flush : 다른 저장소로 데이터 보내는 것
     */
    @Scheduled(fixedRate = 5 * 60 * 1000) //5minute
    public void flushRedisToDb(){
        log.info("🔄 Starting Redis -> DB flush");
//        visionDataService.persistDataFromRedis();
        // 1. Tracking 데이터는 2시간 전 ~ 1시간 전 데이터만 flush
        visionDataService.flushTrackingByTimeRange();

        // 2. 나머지 Vision 데이터 (Heatmap, GenderAge)는 전체 flush
        visionDataService.flushOtherVisionData();

        log.info("✅ Redis -> DB flush complete");

    }
}
