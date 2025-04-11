package capstone.offflow.Vision.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.Session;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SessionDto {

    @NonNull
    private Long id;

    @NonNull
    private Long dashboardId;

    private String visitorLabel;
    private Date sessionStartTime;
    private Date sessionEndTime;
    private int sessionDuration;
    private int visitedAreaCount;
    private String visitedAreaSequence;
    private String areaStayDurations;

    // Entity -> Dto
    public static SessionDto convertToDto(Session session) {
        return SessionDto.builder()
                .id(session.getId())
                .dashboardId(session.getDashboard().getId())
                .visitorLabel(session.getVisitorLabel())
                .sessionStartTime(session.getSessionStartTime())
                .sessionEndTime(session.getSessionEndTime())
                .sessionDuration(session.getSessionDuration())
                .visitedAreaCount(session.getVisitedAreaCount())
                .visitedAreaSequence(session.getVisitedAreaSequence())
                .areaStayDurations(session.getAreaStayDurations())
                .build();
    }

    // Dto -> Entity
    public static Session convertToEntity(SessionDto dto, Dashboard dashboard) {
        Session session = new Session();
        session.setVisitorLabel(dto.getVisitorLabel());
        session.setSessionStartTime(dto.getSessionStartTime());
        session.setSessionEndTime(dto.getSessionEndTime());
        session.setSessionDuration(dto.getSessionDuration());
        session.setVisitedAreaCount(dto.getVisitedAreaCount());
        session.setVisitedAreaSequence(dto.getVisitedAreaSequence());
        session.setAreaStayDurations(dto.getAreaStayDurations());
        session.setDashboard(dashboard);
        return session;
    }
}
