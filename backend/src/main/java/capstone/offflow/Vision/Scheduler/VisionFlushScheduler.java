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
     * Flush : 다른 저장소로 데이터 보내는 것
     */
    @Scheduled(fixedRate = 5 * 60 * 1000) //5minute
    public void flushRedisToDb(){
        log.info("🔄 Starting Redis -> DB flush");
        visionDataService.persistDataFromRedis();
        log.info("✅ Redis -> DB flush complete");
    }
}
