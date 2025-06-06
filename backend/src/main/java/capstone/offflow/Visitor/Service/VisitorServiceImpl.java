package capstone.offflow.Visitor.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.User.Domain.User;
import capstone.offflow.Visitor.Domain.VisitHistory;
import capstone.offflow.Visitor.Domain.Visitor;
import capstone.offflow.Visitor.Dto.VisitorDto;
import capstone.offflow.Visitor.Repository.VisitHistoryRepository;
import capstone.offflow.Visitor.Repository.VisitorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class VisitorServiceImpl implements VisitorService {

    private final DashboardRepository dashboardRepository;
    private final VisitorRepository visitorRepository;
    private final VisitHistoryRepository visitHistoryRepository;

    @Override
    public Visitor createVisitor(VisitorDto visitorDto) {
        // 1. 대시보드 조회
        Dashboard dashboard = dashboardRepository.findById(visitorDto.getDashboardId())
                .orElseThrow(() -> new IllegalArgumentException("대시보드가 존재하지 않습니다."));

        // 2. 유저 조회 (대시보드 소유자)
        User user = dashboard.getUser();

        //3. 이미 있는 유저면 저장 X
        Optional<Visitor> existing = visitorRepository.findByUserAndVisitorNameAndPhoneNumber(user, visitorDto.getVisitorName(), visitorDto.getPhoneNumber());

        if (existing.isPresent()) {
            Visitor visitor = existing.get();

            // 방문한 대시보드인지 체크
            boolean alreadyVisited = visitor.getVisitHistories().stream()
                    .anyMatch(h -> h.getDashboard().getId().equals(dashboard.getId()));

            if (!alreadyVisited) {
                // 방문횟수 증가만 수행 (히스토리 저장 X)
                visitor.setVisitedCount(visitor.getVisitedCount() + 1);
                visitorRepository.save(visitor);
            }

            return visitor;
        }

        // 4. 방문객 생성 및 저장
        Visitor visitor = VisitorDto.convertToEntity(visitorDto, user);
        visitorRepository.save(visitor);

        // 5. 방문 기록 생성
        VisitHistory visitHistory = VisitHistory.builder()
                .visitor(visitor)
                .dashboard(dashboard)
                .visitTime(java.time.LocalDateTime.now())
                .build();

        visitHistoryRepository.save(visitHistory);

        return visitor;
    }

    //유저에 따른 방문객 전체 조회
    @Override
    @Transactional(readOnly = true)
    public List<VisitorDto> getVisitorByUserId(Long id) {
        List<Visitor> visitors = visitorRepository.findAllByUserId(id);

        //방문객(Visitor) 엔티티 리스트를 → DTO 리스트로 변환해서 반환
        return visitors.stream() //stream 호출시 하나하나씩 처리 가능
                .map(VisitorDto::convertToDto) // map : 스트림에서 각 요소를 변환하는 함수
                .collect(Collectors.toList()); // 변환된 DTO들을 다시 리스트(List)로 변환
    }

    @Override
    public VisitorDto getVisitorById(Long visitorId) {
        Visitor visitor = visitorRepository.findById(visitorId)
                .orElseThrow(() -> new EntityNotFoundException("방문객이 존재하지 않습니다."));

        return VisitorDto.convertToDto(visitor);

    }

    @Override
    public void updateVisitor(Long id, VisitorDto visitorDto) {
        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("방문객을 찾을 수 없습니다."));

        visitor.setVisitorName(visitorDto.getVisitorName());
        visitor.setPrivacyAccepted(visitorDto.getPrivacyAccepted());
        visitor.setServiceAccepted(visitorDto.getServiceAccepted());
        visitor.setMarketingAccepted(visitorDto.getMarketingAccepted());
        visitor.setReservationDate(visitorDto.getReservationDate());

        // 굳이 user는 변경 안 해도 됨 (만약 변경한다면 추가로 처리)
        visitorRepository.save(visitor);

    }

    @Override
    public void deleteVisitor(Long id) {
        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("해당 Id의 방문객을 찾을 수 없습니다."));

        visitorRepository.delete(visitor);
        log.info("Visitor 삭제완료 {}", visitor.getId());
    }
}
