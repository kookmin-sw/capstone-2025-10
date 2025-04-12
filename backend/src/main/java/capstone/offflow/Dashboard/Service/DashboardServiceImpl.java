package capstone.offflow.Dashboard.Service;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.DashboardMetadata;
import capstone.offflow.Dashboard.Dto.DashboardDto;
import capstone.offflow.Dashboard.Dto.MetadataDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.User.Domain.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional //트랜잭션
@Slf4j
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService{

    private final DashboardRepository dashboardRepository;

    @Override
    public Dashboard createDashboard(DashboardDto dashboardDto, User user) {
        Dashboard dashboard = new Dashboard();
        dashboard.setDashboardName(dashboardDto.getDashboardName());
        dashboard.setStartDate(dashboardDto.getStartDate());
        dashboard.setUser(user);

        if (dashboardDto.getMetadata() != null) {
            DashboardMetadata metadata = MetadataDto.convertToEntity(dashboardDto.getMetadata());
            dashboard.setMetadata(metadata);
        } else {
            dashboard.setMetadata(null); // 명시적으로 null 처리 (선택사항)
        }

        return dashboardRepository.saveAndFlush(dashboard);
    }

    @Override
    @Transactional(readOnly = true) //flush, dirty checking (변경감지) 생략
    public DashboardDto getDashboardById(Long id, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 id의 유저를 찾을 수 없습니다."));

        //fetch join을 통해 섹션까지 함꼐 조회한 경우
        return DashboardDto.convertToDto(dashboard);
    }

    //dashboard 전체 조회
    @Override
    public List<DashboardDto> getAllDashboard(User user) {
        List<Dashboard> dashboards = dashboardRepository.findAllByUser(user);

        return dashboards.stream()
                .map(DashboardDto::convertToDto)
                .collect(Collectors.toList());

    }

    @Override
    public void deleteDashboard(Long id, User user) {
        Dashboard dashboard = dashboardRepository.findById(id) // 여기!! user 조건 빼기
                .orElseThrow(() -> new EntityNotFoundException("삭제할 대시보드를 찾을 수 없습니다."));

        if (!dashboard.getUser().equals(user)) {
            throw new AccessDeniedException("이 대시보드를 삭제할 권한이 없습니다.");
        }

        dashboardRepository.delete(dashboard);
        log.info("Dashboard 삭제 완료: {}", dashboard.getId());
    }

}
