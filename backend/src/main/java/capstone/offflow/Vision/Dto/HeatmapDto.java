package capstone.offflow.Vision.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.Heatmap;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class HeatmapDto {

    private Long id;

    @NonNull
    private Long dashboardId;

    private Date detectedTime;
    private String gridList;

    // Entity -> Dto
    public static HeatmapDto convertToDto(Heatmap heatmap) {
        return HeatmapDto.builder()
                .id(heatmap.getId())
                .dashboardId(heatmap.getDashboard().getId())
                .detectedTime(heatmap.getDetectedTime())
                .gridList(heatmap.getGridList())
                .build();
    }

    // Dto -> Entity
    public static Heatmap convertToEntity(HeatmapDto dto, Dashboard dashboard) {
        Heatmap heatmap = new Heatmap();
        heatmap.setDetectedTime(dto.getDetectedTime());
        heatmap.setGridList(dto.getGridList());
        heatmap.setDashboard(dashboard);
        return heatmap;
    }
}
