package capstone.offflow.Vision.Controller;


import capstone.offflow.User.Service.UserPrincipal;
import capstone.offflow.Vision.Dto.TrackingDto;
import capstone.offflow.Vision.Service.Business.TrackingService;
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
@RequestMapping("api/tracking")
public class TrackingController {

    private final TrackingService trackingService;

    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getTrackingByDashboardId(
            @PathVariable(name = "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        List<TrackingDto> dto = trackingService.getTrackingById(dashboardId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/previous-hour/{dashboardId}")
    public ResponseEntity<?> getPreviousHourTracking(
            @PathVariable Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        List<TrackingDto> trackingData = trackingService.getTrackingForPreviousHour(
                dashboardId, userPrincipal.getUser());

        return ResponseEntity.ok(trackingData);
    }


}




