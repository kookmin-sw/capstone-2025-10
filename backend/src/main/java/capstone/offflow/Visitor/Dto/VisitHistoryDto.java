package capstone.offflow.Visitor.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Visitor.Domain.VisitHistory;
import capstone.offflow.Visitor.Domain.Visitor;
import lombok.*;

import java.time.LocalDateTime;

/**
 * visit -> dashboard 정보가져오기
 * 정보 -> visitHistory 내역 저장
 */

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class VisitHistoryDto {

    private Long id;
    private Long visitorId;
    private Long dashboardId;
    private String dashboardName;
    private LocalDateTime visitTime;

    // Entity -> DTO
    public static VisitHistoryDto convertToDto(VisitHistory visitHistory) {
        return VisitHistoryDto.builder()
                .id(visitHistory.getId())
                .visitorId(visitHistory.getVisitor().getId())
                .dashboardId(visitHistory.getDashboard().getId())
                .dashboardName(visitHistory.getDashboard().getDashboardName())
                .visitTime(visitHistory.getVisitTime())
                .build();
    }

    // DTO → Entity (등록용)
    public static VisitHistory convertToEntity(VisitHistoryDto dto, Visitor visitor, Dashboard dashboard) {
        return VisitHistory.builder()
                .visitor(visitor)
                .dashboard(dashboard)
                .visitTime(dto.getVisitTime() != null ? dto.getVisitTime() : LocalDateTime.now())
                .build();
    }

}
