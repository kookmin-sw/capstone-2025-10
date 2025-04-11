package capstone.offflow.Vision.Controller;


import capstone.offflow.Vision.Service.Business.TrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/tracking")
public class TrackingController {

    private final TrackingService trackingService;

    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getTrackingByDashboardId(

    ){

    }


}
