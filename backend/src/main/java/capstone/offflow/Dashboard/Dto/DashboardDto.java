package capstone.offflow.Dashboard.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Product;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class DashboardDto {

    @NonNull
    private Long id;
    private String dashboardName;

    private String imageUrl;
    private Date startDate;
    private Date endDate;

    //metadata
    private MetadataDto metadata;

    //section
    private List<SectionDto> sections;

    public static DashboardDto convertToDto(Dashboard dashboard){
        return DashboardDto.builder()
                .id(dashboard.getId())
                .dashboardName(dashboard.getDashboardName())
                .imageUrl(dashboard.getImageUrl())
                .startDate(dashboard.getStartDate())
                .endDate(dashboard.getEndDate())
                .metadata(MetadataDto.convertToDto(dashboard.getMetadata()))
                .sections(dashboard.getSections().stream()
                        .map(SectionDto::convertToDto)
                        .collect(Collectors.toList()))
                .build();
    }


    //DTO -> Entity (생성/수정용)
    public static Dashboard convertToEntity(DashboardDto dashboardDto){
        Dashboard dashboard = new Dashboard();
        dashboard.setDashboardName(dashboardDto.getDashboardName());
        dashboard.setImageUrl(dashboardDto.getImageUrl());
        dashboard.setStartDate(dashboardDto.getStartDate());
        dashboard.setEndDate(dashboardDto.getEndDate());
        dashboard.setMetadata(MetadataDto.convertToEntity(dashboardDto.getMetadata())); // ✅ 변환 필요
        dashboard.setSections(new ArrayList<>());
        return dashboard;
    }

}
