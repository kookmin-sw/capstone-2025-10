package capstone.offflow.Vision.Controller;


import capstone.offflow.Vision.Service.Business.HeatmapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/heatmap")
public class HeatmapController {

    private final HeatmapService heatmapService;

    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getHeatmapByDashboardId(

    ){

    }




}
