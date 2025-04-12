package capstone.offflow.Vision.Service.Business;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Vision.Domain.GenderAge;
import capstone.offflow.Vision.Domain.Heatmap;
import capstone.offflow.Vision.Domain.Tracking;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Dto.HeatmapDto;
import capstone.offflow.Vision.Dto.TrackingDto;
import capstone.offflow.Vision.Service.Kafka.KafkaMessageWrapper;
import capstone.offflow.Vision.Service.Redis.VisionRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class VisionDataServiceImpl implements VisionDataService {

    private final VisionRedisService visionRedisService;
    private final DashboardRepository dashboardRepository;

    @Override
    public void processIncomingData(KafkaMessageWrapper wrapper) {
        String type = wrapper.getType();

        try {
            Long dashboardId = Long.parseLong(wrapper.getPayload().get("dashboardId").toString());
            Dashboard dashboard = dashboardRepository.findById(dashboardId)
                    .orElseThrow(() -> new IllegalArgumentException("Dashboard not found"));

            switch (type) {
                case "heatmap":
                    handleHeatmap(wrapper, dashboard);
                    break;

                case "tracking":
                    handleTracking(wrapper, dashboard);
                    break;

                case "genderAge":
                    handleGenderAge(wrapper, dashboard);
                    break;

                default:
                    throw new IllegalArgumentException("Unknown Vision Data Type: " + type);
            }
        } catch (Exception e) {
            log.error("❌ Error processing Vision data: {}", e.getMessage(), e);
        }
    }

    private void handleHeatmap(KafkaMessageWrapper wrapper, Dashboard dashboard) {
        Long detectedTimeLong = Long.parseLong(wrapper.getPayload().get("detectedTime").toString());
        Date detectedTime = new Date(detectedTimeLong);
        String gridList = wrapper.getPayload().get("gridList").toString();

        HeatmapDto dto = HeatmapDto.builder()
                .dashboardId(dashboard.getId())
                .detectedTime(detectedTime)
                .gridList(gridList)
                .build();

        Heatmap heatmap = HeatmapDto.convertToEntity(dto, dashboard);
        visionRedisService.cacheData("heatmap", heatmap);
    }

    private void handleTracking(KafkaMessageWrapper wrapper, Dashboard dashboard) {
        Long detectedTimeLong = Long.parseLong(wrapper.getPayload().get("detectedTime").toString());
        Date detectedTime = new Date(detectedTimeLong);
        String visitorLabel = wrapper.getPayload().get("visitorLabel").toString();
        String gridList = wrapper.getPayload().get("gridList").toString();

        TrackingDto dto = TrackingDto.builder()
                .dashboardId(dashboard.getId())
                .detectedTime(detectedTime)
                .visitorLabel(visitorLabel)
                .gridList(gridList)
                .build();

        Tracking tracking = TrackingDto.convertToEntity(dto, dashboard);
        visionRedisService.cacheData("tracking", tracking);
    }

    private void handleGenderAge(KafkaMessageWrapper wrapper, Dashboard dashboard) {
        Date detectedTime = new Date(); // 현재 시간 기준
        String visitorLabel = wrapper.getPayload().get("visitorLabel").toString();
        String gender = wrapper.getPayload().get("gender").toString();
        String age = wrapper.getPayload().get("age").toString();

        GenderAgeDto dto = GenderAgeDto.builder()
                .dashboardId(dashboard.getId())
                .detectedTime(detectedTime)
                .visitorLabel(visitorLabel)
                .gender(gender)
                .age(age)
                .build();

        GenderAge genderAge = GenderAgeDto.convertToEntity(dto, dashboard);
        visionRedisService.cacheData("genderAge", genderAge);
    }


    /**
     * Redis에 저장된 비전 데이터를 RDB로 옮기는 기능 호출
     */
    @Override
    public void persistDataFromRedis() {
        visionRedisService.flushCacheToDatabase();
    }
}
