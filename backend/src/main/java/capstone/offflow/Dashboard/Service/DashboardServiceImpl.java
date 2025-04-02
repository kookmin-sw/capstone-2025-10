package capstone.offflow.Dashboard.Service;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.DashboardMetadata;
import capstone.offflow.Dashboard.Dto.DashboardDto;
import capstone.offflow.Dashboard.Dto.MetadataDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.User.Domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional //트랜잭션
@Slf4j
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService{

    private final DashboardRepository dashboardRepository;

    @Override
    public void createDashboard(DashboardDto dashboardDto, User user) {
        Dashboard dashboard = new Dashboard();
        dashboard.setDashboardName(dashboardDto.getDashboardName());
        dashboard.setStartDate(dashboardDto.getStartDate());
        dashboard.setUser(user);

        if (dashboardDto.getMetadataDto() != null) {
            DashboardMetadata metadata = MetadataDto.convertToEntity(dashboardDto.getMetadataDto());
            dashboard.setMetadata(metadata);
        } else {
            dashboard.setMetadata(null); // 명시적으로 null 처리 (선택사항)
        }

        dashboardRepository.save(dashboard);
        log.info("Dashboard 생성 완료 - {}", dashboard.getId());
    }

    @Override
    @Transactional(readOnly = true) //flush, dirty checking (변경감지) 생략
    public DashboardDto getDashboardById(Long id, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("해당 id의 유저를 찾을 수 없습니다."));

        //fetch join을 통해 섹션 + 상품까지 함꼐 조회한 경우
        return DashboardDto.convertToDto(dashboard);
    }

    @Override
    public void deleteDashboard(Long id, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 대시보드를 찾을 수 없습니다."));

        dashboardRepository.delete(dashboard);
        log.info("Dashboard 삭제완료 {}", dashboard.getId());

    }
}
