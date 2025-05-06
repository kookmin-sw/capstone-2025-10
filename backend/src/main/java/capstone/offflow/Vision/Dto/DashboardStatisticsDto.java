package capstone.offflow.Vision.Dto;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Vision.Domain.DashboardStatistics;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class DashboardStatisticsDto {

    @NonNull
    private Long id;

    @NonNull
    private Long dashboardId;

    private Long eventId; //첫 생성시 없을 수 있음
    private Long sectionId;

    private int totalVisitors; //총 방문자수 (중복 허용)
    private int averageStayTime; //평균 체류시간

    private Date calculatedTime; //통계 측정 일자

    private Double maleRatio;
    private Double femaleRatio;

    private String ageGroupRatioJson; // JSON 문자열


    //Entity -> Dto
    public static DashboardStatisticsDto convertToDto(DashboardStatistics dashboardStatistics){
        return DashboardStatisticsDto.builder()
                .id(dashboardStatistics.getId())
                .totalVisitors(dashboardStatistics.getTotalVisitors())
                .dashboardId(dashboardStatistics.getDashboard().getId()) //dashboard id추가
                .eventId(
                        dashboardStatistics.getEvent() != null
                        ? dashboardStatistics.getEvent().getId() : null)
                .sectionId(
                        dashboardStatistics.getSection() != null
                        ? dashboardStatistics.getSection().getId() : null
                )
                .averageStayTime(dashboardStatistics.getAverageStayTime())
                .calculatedTime(dashboardStatistics.getCalculatedTime())
                .maleRatio(dashboardStatistics.getMaleRatio())
                .femaleRatio(dashboardStatistics.getFemaleRatio())
                .ageGroupRatioJson(dashboardStatistics.getAgeGroupRatioJson())
                .build();
    }

    //Dto -> Entity
    public static DashboardStatistics convertToEntity(DashboardStatisticsDto dto, Dashboard dashboard, Section section, Event event){
        DashboardStatistics dashboardStatistics = new DashboardStatistics();
        dashboardStatistics.setTotalVisitors(dto.getTotalVisitors());
        dashboardStatistics.setAverageStayTime(dto.getAverageStayTime());
        dashboardStatistics.setCalculatedTime(dto.getCalculatedTime());
        dashboardStatistics.setDashboard(dashboard);
        dashboardStatistics.setEvent(event);
        dashboardStatistics.setSection(section);
        dashboardStatistics.setMaleRatio(dto.getMaleRatio());
        dashboardStatistics.setFemaleRatio(dto.getFemaleRatio());
        dashboardStatistics.setAgeGroupRatioJson(dto.getAgeGroupRatioJson());
        return dashboardStatistics;
    }
}
