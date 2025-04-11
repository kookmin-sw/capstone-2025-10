package capstone.offflow.Vision.Service.Business;


import capstone.offflow.User.Domain.User;

import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Dto.HeatmapDto;
import capstone.offflow.Vision.Repository.HeatmapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HeatmapServiceImpl implements HeatmapService{

    private final HeatmapRepository heatmapRepository;

    @Override
    public List<HeatmapDto> getHeatmapById(Long dashboardId, User user) {
        return heatmapRepository.findAllByDashboard_User(dashboardId, user).stream()
                .map(HeatmapDto::convertToDto)
                .toList();
    }
}
