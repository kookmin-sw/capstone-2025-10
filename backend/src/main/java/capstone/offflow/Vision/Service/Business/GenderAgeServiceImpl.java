package capstone.offflow.Vision.Service.Business;
import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.GenderAge;
import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Repository.GenderAgeRepository;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GenderAgeServiceImpl implements GenderAgeService{

    private final GenderAgeRepository genderAgeRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private final DashboardRepository dashboardRepository;

    private static final String GENDER_AGE_KEY_PREFIX = "genderAge:";

    @Override
    public List<GenderAgeDto> getGenderAgeById(Long dashboardId, User user) {
        String redisKey = GENDER_AGE_KEY_PREFIX + dashboardId + ":" + user.getId();

        // 1. Redis에서 먼저 찾는다
        try {
            Object cachedRaw = redisTemplate.opsForValue().get(redisKey);
            if (cachedRaw instanceof List<?> cachedList && !cachedList.isEmpty()) {
                // 안전하게 캐스팅
                if (cachedList.get(0) instanceof GenderAgeDto) {
                    return (List<GenderAgeDto>) cachedRaw;
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // 로그만 찍고 계속 진행
        }

        // 2. Redis에 없으면 DB 조회
        List<GenderAgeDto> dbResult = genderAgeRepository.findAllByDashboard_IdAndDashboard_User(dashboardId, user).stream()
                .map(GenderAgeDto::convertToDto)
                .toList();

        // 3. Redis에 저장
        redisTemplate.opsForValue().set(redisKey, dbResult, Duration.ofMinutes(10));

        return dbResult;
    }

    @Override
    public void save(GenderAgeDto dto, Long dashboardId) {
        Dashboard dashboard = dashboardRepository.findById(dashboardId)
            .orElseThrow(() -> new IllegalArgumentException("Dashboard not found"));

        GenderAge entity = GenderAgeDto.convertToEntity(dto, dashboard);
        genderAgeRepository.save(entity);
    }
}
