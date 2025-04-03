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

    private Long userId; // 등록용 - User기준
    private Date registerDate;
    private Date reservationDate;

    private List<String> visitedDashboards; // 응답용: 방문한 대시보드 이름 목록

    // Entity → DTO
    public static VisitorDto fromEntity(Visitor visitor) {

        //NPE 고려
        List<String> dashboards = Optional.ofNullable(visitor.getVisitHistories())
                .orElse(Collections.emptyList())
                .stream()
                .map(h -> h.getDashboard().getDashboardName())
                .distinct()
                .collect(Collectors.toList());

        return VisitorDto.builder()
                .id(visitor.getId())
                .visitorName(visitor.getVisitorName())
                .phoneNumber(visitor.getPhoneNumber())
                .privacyAccepted(visitor.getPrivacyAccepted())
                .serviceAccepted(visitor.getServiceAccepted())
                .marketingAccepted(visitor.getMarketingAccepted())
                .registerDate(visitor.getRegisterDate())
                .reservationDate(visitor.getReservationDate())
                .visitedDashboards(dashboards)
                .build();
    }

    // DTO → Entity (등록 시)
    public static Visitor toEntity(VisitorDto dto, User user) {
        Visitor visitor = new Visitor();
        visitor.setVisitorName(dto.getVisitorName());
        visitor.setPhoneNumber(dto.getPhoneNumber());
        visitor.setPrivacyAccepted(dto.getPrivacyAccepted());
        visitor.setServiceAccepted(dto.getServiceAccepted());
        visitor.setMarketingAccepted(dto.getMarketingAccepted());
        visitor.setRegisterDate(new Date());
        visitor.setUser(user);
        return visitor;
    }
}
