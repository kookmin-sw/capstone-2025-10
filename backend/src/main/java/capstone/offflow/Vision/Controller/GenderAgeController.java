package capstone.offflow.Vision.Controller;


import capstone.offflow.User.Service.UserPrincipal;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Service.Business.GenderAgeService;
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
@RequestMapping("api/gender")
public class GenderAgeController {

    private final GenderAgeService genderAgeService;

    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getGenderAgeByDashboardId(
            @PathVariable(name = "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        List<GenderAgeDto> dto = genderAgeService.getGenderAgeById(dashboardId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }


}
