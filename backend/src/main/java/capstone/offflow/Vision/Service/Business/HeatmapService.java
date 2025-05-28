package capstone.offflow.Vision.Service.Business;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Domain.Heatmap;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Dto.HeatmapDto;

import java.util.List;

public interface HeatmapService {

    List<HeatmapDto> getHeatmapById(Long dashboardId, User user);

    List<HeatmapDto> getAllHeatmapById(Long dashboardId, User user);

    void save(HeatmapDto dto, Long dashboardId);
}
