package capstone.offflow.Dashboard.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import lombok.*;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class DashboardDto {

    private Long id;
    private String dashboardName;

    private Date startDate;
    private Date endDate;

    //metadata
    private MetadataDto metadataDto;

    //section
    private List<SectionDto> sections;

    public static DashboardDto convertToDto(Dashboard dashboard){
        return DashboardDto.builder()
                .id(dashboard.getId())
                .dashboardName(dashboard.getDashboardName())
                .startDate(dashboard.getStartDate())
                .endDate(dashboard.getEndDate())
                .metadataDto(MetadataDto.convertToDto(dashboard.getMetadata()))
                .sections(dashboard.getSections().stream()
                        .map(SectionDto::convertToDto)
                        .collect(Collectors.toList()))
                .build();
    }

}
