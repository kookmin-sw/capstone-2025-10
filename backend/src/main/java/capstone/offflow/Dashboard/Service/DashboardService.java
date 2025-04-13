package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Dto.DashboardDto;
import capstone.offflow.User.Domain.User;

import java.util.List;

public interface DashboardService {

    Dashboard createDashboard(DashboardDto dashboardDto, User user);
    DashboardDto getDashboardById(Long Id, User user);

    List<DashboardDto> getAllDashboard(User user);
    void deleteDashboard(Long id, User user);

}
