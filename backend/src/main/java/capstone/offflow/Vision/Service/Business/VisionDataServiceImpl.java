package capstone.offflow.Vision.Service.Business;

import capstone.offflow.Vision.Service.Kafka.KafkaMessageWrapper;
import capstone.offflow.Vision.Service.Redis.VisionRedisService;

import capstone.offflow.Vision.Dto.GenderAgeDto;
import java.util.Date;
import capstone.offflow.Vision.Service.Business.GenderAgeService;

import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.GenderAge;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class VisionDataServiceImpl implements VisionDataService{

    private final VisionRedisService visionRedisService;

    private final GenderAgeService genderAgeService;
    private final DashboardRepository dashboardRepository;

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
                try {
                    Long dashboardId = Long.parseLong(wrapper.getPayload().get("dashboardId").toString());

                    Dashboard dashboard = dashboardRepository.findById(dashboardId)
                        .orElseThrow(() -> new IllegalArgumentException("Dashboard not found"));

                    GenderAge genderAge = new GenderAge();
                    genderAge.setDashboard(dashboard);
                    genderAge.setAge(wrapper.getPayload().get("age").toString());
                    genderAge.setGender(wrapper.getPayload().get("gender").toString());
                    genderAge.setVisitorLabel(wrapper.getPayload().get("visitorLabel").toString());
                    genderAge.setDetectedTime(new Date());

                    // ✅ Redis에 저장
                    visionRedisService.cacheData("genderAge", genderAge);

                    // ✅ DB에도 즉시 저장 (선택)
                    GenderAgeDto dto = GenderAgeDto.builder()
                            .dashboardId(dashboardId)
                            .detectedTime(genderAge.getDetectedTime())
                            .visitorLabel(genderAge.getVisitorLabel())
                            .gender(genderAge.getGender())
                            .age(genderAge.getAge())
                            .build();

                    genderAgeService.save(dto, dashboardId);

                } catch (Exception e) {
                    e.printStackTrace();
                    throw new RuntimeException("Failed to parse and save genderAge message", e);
                }
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
