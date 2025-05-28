package capstone.offflow.Vision.Service.Business;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Domain.GenderAge;
import capstone.offflow.Vision.Domain.Tracking;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Dto.TrackingDto;
import capstone.offflow.Vision.Repository.TrackingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TrackingServiceImpl implements TrackingService{

    private final TrackingRepository trackingRepository;
    private final DashboardRepository dashboardRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String TRACKING_KEY_PREFIX = "tracking:";

    @Override
    public List<TrackingDto> getTrackingById(Long dashboardId, User user) {
        String redisKey = TRACKING_KEY_PREFIX + dashboardId + ":" + user.getId();

        try {
            Object cachedRaw = redisTemplate.opsForValue().get(redisKey);
            if (cachedRaw instanceof List<?> cachedList && !cachedList.isEmpty()) {
                // 안전하게 캐스팅
                if (cachedList.get(0) instanceof TrackingDto) {
                    return (List<TrackingDto>) cachedRaw;
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // 로그만 찍고 계속 진행
        }

        // 2. Redis에 없으면 DB 조회
        List<TrackingDto> dbResult = trackingRepository.findAllByDashboard_IdAndDashboard_User(dashboardId, user).stream()
                .map(TrackingDto::convertToDto)
                .toList();

        // 3. Redis에 저장
        redisTemplate.opsForValue().set(redisKey, dbResult, Duration.ofMinutes(10));

        return dbResult;
    }



    @Override
    public void save(TrackingDto dto, Long dashboardId) {
        Dashboard dashboard = dashboardRepository.findById(dashboardId)
                .orElseThrow(() -> new IllegalArgumentException("Dashboard not found"));

        Tracking entity = TrackingDto.convertToEntity(dto, dashboard);
        trackingRepository.save(entity);
    }

    @Override
    public List<TrackingDto> getTrackingForPreviousHour(Long dashboardId, User user) {
        return null;
    }

}
