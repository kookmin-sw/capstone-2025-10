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

}
