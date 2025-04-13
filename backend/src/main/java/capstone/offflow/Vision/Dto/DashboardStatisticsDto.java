package capstone.offflow.Vision.Dto;


import capstone.offflow.Dashboard.Domain.Dashboard;
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

    private int totalVisitors; //총 방문자수 (중복 허용)
    private int averageStayTime; //평균 체류시간

    private Date calculatedTime; //통계 측정 일자


    //Entity -> Dto
    public static DashboardStatisticsDto convertToDto(DashboardStatistics dashboardStatistics){
        return DashboardStatisticsDto.builder()
                .id(dashboardStatistics.getId())
                .totalVisitors(dashboardStatistics.getTotalVisitors())
                .dashboardId(dashboardStatistics.getDashboard().getId()) //dashboard id추가
                .averageStayTime(dashboardStatistics.getAverageStayTime())
                .calculatedTime(dashboardStatistics.getCalculatedTime())
                .build();
    }

    //Dto -> Entity
    public static DashboardStatistics convertToEntity(DashboardStatisticsDto dto, Dashboard dashboard){
        DashboardStatistics dashboardStatistics = new DashboardStatistics();
        dashboardStatistics.setTotalVisitors(dto.getTotalVisitors());
        dashboardStatistics.setAverageStayTime(dto.getAverageStayTime());
        dashboardStatistics.setCalculatedTime(dto.getCalculatedTime());
        dashboardStatistics.setDashboard(dashboard);
        return dashboardStatistics;
    }
}
