package capstone.offflow.Vision.Service.Business;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.User.Domain.User;

import capstone.offflow.Vision.Domain.GenderAge;
import capstone.offflow.Vision.Domain.Heatmap;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Dto.HeatmapDto;
import capstone.offflow.Vision.Repository.HeatmapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HeatmapServiceImpl implements HeatmapService {

    private final HeatmapRepository heatmapRepository;
    private final DashboardRepository dashboardRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String HEATMAP_KEY_PREFIX = "heatmap:";

    @Override
    public List<HeatmapDto> getHeatmapById(Long dashboardId, User user) {
        String redisKey = HEATMAP_KEY_PREFIX + dashboardId;

        // 1. Redis에서 먼저 찾는다
        try {
            Object cachedRaw = redisTemplate.opsForValue().get(redisKey);
            if (cachedRaw instanceof List<?> cachedList && !cachedList.isEmpty()) {
                // 안전하게 캐스팅
                if (cachedList.get(0) instanceof HeatmapDto) {
                    return (List<HeatmapDto>) cachedRaw;
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // 로그만 찍고 계속 진행
        }

        // 2. Redis에 없으면 (Cache Miss) DB에서 찾는다
        List<HeatmapDto> dbResult = heatmapRepository.findAllByDashboard_IdAndDashboard_User(dashboardId, user).stream()
                .map(HeatmapDto::convertToDto)
                .toList();

        // 3. 가져온 결과를 Redis에 저장 (TTL 10분 설정)
        redisTemplate.opsForValue().set(redisKey, dbResult, Duration.ofMinutes(10));

        return dbResult;
    }

    @Override
    public void save(HeatmapDto dto, Long dashboardId) {
        Dashboard dashboard = dashboardRepository.findById(dashboardId)
                .orElseThrow(() -> new IllegalArgumentException("Dashboard not found"));

        Heatmap entity = HeatmapDto.convertToEntity(dto, dashboard);
        heatmapRepository.save(entity);

    }

}
