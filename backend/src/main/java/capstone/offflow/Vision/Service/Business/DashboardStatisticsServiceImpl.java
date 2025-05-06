package capstone.offflow.Vision.Service.Business;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Repository.SectionRepository;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Repository.EventRepository;
import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Domain.DashboardStatistics;
import capstone.offflow.Vision.Dto.DashboardStatisticsDto;
import capstone.offflow.Vision.Repository.DashboardStatisticsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DashboardStatisticsServiceImpl implements DashboardStatisticsService{

    private final DashboardStatisticsRepository dashboardStatisticsRepository;
    private final DashboardRepository dashboardRepository;
    private final SectionRepository sectionRepository;
    private final EventRepository eventRepository;

    @Override
    public DashboardStatistics createStatistics(DashboardStatisticsDto dto, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(dto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        //ID가 존재할 때 진짜 존재해야하는 것을 보장함
        //Client가 잘못된 ID를 넣으면 400/404 예외로 명확하게 예외처리가능
        Section section = dto.getSectionId() != null ?
                sectionRepository.findById(dto.getSectionId())
                        .orElseThrow(() -> new EntityNotFoundException("섹션을 찾을 수 없습니다."))
                : null;

        Event event = dto.getEventId() != null ?
                eventRepository.findById(dto.getEventId())
                        .orElseThrow(() -> new EntityNotFoundException("이벤트를 찾을 수 없습니다."))
                : null;

        DashboardStatistics statistics = DashboardStatisticsDto.convertToEntity(dto, dashboard, section, event);
        return dashboardStatisticsRepository.save(statistics);

    }

    @Override
    @Transactional(readOnly = true)
    public List<DashboardStatisticsDto> getStatisticsByDashboard(Long dashboardId, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(dashboardId, user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        return dashboardStatisticsRepository.findByDashboard(dashboard).stream()
                .map(DashboardStatisticsDto::convertToDto)
                .collect(Collectors.toList());

    }

    @Override
    public void deleteStatistics(Long id) {
        if (!dashboardStatisticsRepository.existsById(id)){
            throw new EntityNotFoundException("통계 데이터를 찾을 수 없습니다.");
        }
        dashboardStatisticsRepository.deleteById(id);
    }
}
