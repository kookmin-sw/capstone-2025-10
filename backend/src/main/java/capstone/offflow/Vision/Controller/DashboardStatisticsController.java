package capstone.offflow.Vision.Controller;

import capstone.offflow.User.Service.UserPrincipal;
import capstone.offflow.Vision.Domain.DashboardStatistics;
import capstone.offflow.Vision.Dto.DashboardStatisticsDto;
import capstone.offflow.Vision.Service.Business.DashboardStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
public class DashboardStatisticsController {

    private final DashboardStatisticsService dashboardStatisticsService;

    @PostMapping
    public ResponseEntity<?> createStatistics(
            @RequestBody DashboardStatisticsDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        DashboardStatistics dashboardStatistics = dashboardStatisticsService.createStatistics(dto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(DashboardStatisticsDto.convertToDto(dashboardStatistics));
    }


    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getAllByDashboard(
            @PathVariable (name = "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        List<DashboardStatisticsDto> dashboardStatisticsDto = dashboardStatisticsService.getStatisticsByDashboard(dashboardId,userPrincipal.getUser());
        return ResponseEntity.ok(dashboardStatisticsDto);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStatistics(@PathVariable (name = "id") Long id){
        dashboardStatisticsService.deleteStatistics(id);
        return ResponseEntity.ok().build();
    }
}
