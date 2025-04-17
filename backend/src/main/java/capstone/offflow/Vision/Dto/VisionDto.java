package capstone.offflow.Vision.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.Vision;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class VisionDto {

    @NonNull
    private Long id;

    @NonNull
    private Long dashboardId;

    private String deviceType;
    private String deviceStatus;
    private Date installationDate;

    // Entity -> Dto
    public static VisionDto convertToDto(Vision vision) {
        return VisionDto.builder()
                .id(vision.getId())
                .dashboardId(vision.getDashboard().getId())
                .deviceType(vision.getDeviceType())
                .deviceStatus(vision.getDeviceStatus())
                .installationDate(vision.getInstallationDate())
                .build();
    }

    // Dto -> Entity
    public static Vision convertToEntity(VisionDto dto, Dashboard dashboard) {
        Vision vision = new Vision();
        vision.setDeviceType(dto.getDeviceType());
        vision.setDeviceStatus(dto.getDeviceStatus());
        vision.setInstallationDate(dto.getInstallationDate());
        vision.setDashboard(dashboard);
        return vision;
    }
}
