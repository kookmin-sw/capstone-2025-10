package capstone.offflow.Vision.Service.Business;


import capstone.offflow.User.Domain.User;

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
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String HEATMAP_KEY_PREFIX = "heatmap:";

    @Override
    public List<HeatmapDto> getHeatmapById(Long dashboardId, User user) {
        String redisKey = HEATMAP_KEY_PREFIX + dashboardId;

        // 1. Redis에서 먼저 찾는다
        List<HeatmapDto> cached = (List<HeatmapDto>) redisTemplate.opsForValue().get(redisKey);
        if (cached != null) {
            return cached;
        }

        // 2. Redis에 없으면 (Cache Miss) DB에서 찾는다
        List<HeatmapDto> dbResult = heatmapRepository.findAllByDashboard_IdAndDashboard_User(dashboardId, user).stream()
                .map(HeatmapDto::convertToDto)
                .toList();

        // 3. 가져온 결과를 Redis에 저장 (TTL 10분 설정)
        redisTemplate.opsForValue().set(redisKey, dbResult, Duration.ofMinutes(10));

        return dbResult;
    }
}
