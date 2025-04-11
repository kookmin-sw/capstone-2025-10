package capstone.offflow.Vision.Service.Business;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Dto.HeatmapDto;

import java.util.List;

public interface HeatmapService {

    List<HeatmapDto> getHeatmapById(Long dashboardId, User user);
}
