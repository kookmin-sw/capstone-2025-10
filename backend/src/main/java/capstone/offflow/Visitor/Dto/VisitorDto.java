package capstone.offflow.Visitor.Dto;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Visitor.Domain.Visitor;
import lombok.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class VisitorDto {

    private Long id;
    private String visitorName;
    private String phoneNumber;

    private Boolean privacyAccepted;
    private Boolean serviceAccepted;
    private Boolean marketingAccepted;
    private Boolean phoneVerified;

    private String userId; // 등록용 - User기준
    private Long dashboardId; //등록용 - Dashboard 확인

    private Date registerDate;
    private Date reservationDate;

    private List<String> visitedDashboards; // 응답용: 방문한 대시보드 이름 목록
    private int visitedCount; //방문횟수

    // Entity → DTO
    public static VisitorDto convertToDto(Visitor visitor) {

        // 방문기록에서 대시보드 이름 추출 (null 방어 포함 : NPE)
        List<String> dashboards = Optional.ofNullable(visitor.getVisitHistories())
                .orElse(Collections.emptyList())
                .stream()
                .map(history -> {
                    try {
                        // 프록시 예외 방지
                        return Optional.ofNullable(history.getDashboard())
                                .map(d -> d.getDashboardName())
                                .orElse("Unknown Dashboard");
                    } catch (Exception e) {
                        return "Invalid Dashboard";
                    }
                })
                .distinct()
                .collect(Collectors.toList());

        return VisitorDto.builder()
                .id(visitor.getId())
                .visitorName(visitor.getVisitorName())
                .phoneNumber(visitor.getPhoneNumber())
                .privacyAccepted(visitor.getPrivacyAccepted())
                .serviceAccepted(visitor.getServiceAccepted())
                .marketingAccepted(visitor.getMarketingAccepted())
                .phoneVerified(visitor.getPhoneVerified())
                .registerDate(visitor.getRegisterDate())
                .reservationDate(visitor.getReservationDate())
                .visitedDashboards(dashboards)
                .visitedCount(visitor.getVisitedCount())
                .build();
    }

    // DTO → Entity (등록 시)
    public static Visitor convertToEntity(VisitorDto dto, User user) {
        Visitor visitor = new Visitor();
        visitor.setVisitorName(dto.getVisitorName());
        visitor.setPhoneNumber(dto.getPhoneNumber());
        visitor.setPrivacyAccepted(dto.getPrivacyAccepted());
        visitor.setServiceAccepted(dto.getServiceAccepted());
        visitor.setMarketingAccepted(dto.getMarketingAccepted());
        visitor.setPhoneVerified(dto.getPhoneVerified());
        visitor.setRegisterDate(new Date());
        visitor.setUser(user);
        visitor.setVisitedCount(dto.getVisitedCount());
        return visitor;
    }
}
