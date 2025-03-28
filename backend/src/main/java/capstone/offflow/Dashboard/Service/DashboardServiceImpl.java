package capstone.offflow.Dashboard.Service;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Dto.DashboardDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.User.Domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService{

    private final DashboardRepository dashboardRepository;

    @Override
    public void createDashboard(DashboardDto dashboardDto, User user) {

    }

    @Override
    public DashboardDto getDashboardById(Long id, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("해당 id의 유저를 찾을 수 없습니다."));

    }

    @Override
    public void deleteDashboard(Long id, User user) {

    }
}
