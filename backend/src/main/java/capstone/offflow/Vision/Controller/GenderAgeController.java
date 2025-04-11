package capstone.offflow.Vision.Controller;


import capstone.offflow.Vision.Service.Business.GenderAgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/gender")
public class GenderAgeController {

    private final GenderAgeService genderAgeService;

    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getGenderAgeByDashboardId(

    ){

    }


}
