package capstone.offflow.Vision.Service.Business;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Domain.DashboardStatistics;
import capstone.offflow.Vision.Dto.DashboardStatisticsDto;

import java.util.List;

public interface DashboardStatisticsService {

    DashboardStatistics createStatistics(DashboardStatisticsDto dto, User user);
    List<DashboardStatisticsDto> getStatisticsByDashboard(Long dashboardId, User user);
    void deleteStatistics(Long id);
}
