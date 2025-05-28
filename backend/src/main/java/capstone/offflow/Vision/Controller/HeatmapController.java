package capstone.offflow.Vision.Controller;


import capstone.offflow.User.Service.UserPrincipal;
import capstone.offflow.Vision.Dto.HeatmapDto;
import capstone.offflow.Vision.Service.Business.HeatmapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/heatmap")
public class HeatmapController {

    private final HeatmapService heatmapService;

    @GetMapping("/dashboard/{dashboardId}")
    public ResponseEntity<?> getAllHeatmapByDashboardId(
            @PathVariable(name = "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){
        List<HeatmapDto> dto = heatmapService.getAllHeatmapById(dashboardId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getHeatmapByDashboardId(
            @PathVariable(name = "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        List<HeatmapDto> dto = heatmapService.getHeatmapById(dashboardId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }

}
