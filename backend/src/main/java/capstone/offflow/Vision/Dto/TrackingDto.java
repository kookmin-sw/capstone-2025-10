package capstone.offflow.Vision.Dto;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.Tracking;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
public class TrackingDto {

    private Long id;

    @NonNull
    private Long dashboardId;

    private Date detectedTime;
    private String visitorLabel;
    private String gridList;

    // Entity -> Dto
    public static TrackingDto convertToDto(Tracking tracking) {
        return TrackingDto.builder()
                .id(tracking.getId())
                .dashboardId(tracking.getDashboard().getId())
                .detectedTime(tracking.getDetectedTime())
                .visitorLabel(tracking.getVisitorLabel())
                .gridList(tracking.getGridList())
                .build();
    }

    // Dto -> Entity
    public static Tracking convertToEntity(TrackingDto dto, Dashboard dashboard) {
        Tracking tracking = new Tracking();
        tracking.setDetectedTime(dto.getDetectedTime());
        tracking.setVisitorLabel(dto.getVisitorLabel());
        tracking.setGridList(dto.getGridList());
        tracking.setDashboard(dashboard);
        return tracking;
    }
}
