package capstone.offflow.Dashboard.Controller;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Dto.DashboardDto;
import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Service.DashboardService;
import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Service.UserPrincipal;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController //Controller + ResponseBody 합친 컨트롤러 => API 개발시 사용
@RequiredArgsConstructor //final에 대한 생성자 생성
@RequestMapping("api/dashboard")
@Slf4j
public class DashboardController {


    private final DashboardService dashboardService;


    //dashboard 생성
    @PostMapping
    public ResponseEntity<?> createDashboard(
            @RequestBody @Validated DashboardDto dashboardDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        Dashboard dashboard = dashboardService.createDashboard(dashboardDto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(DashboardDto.convertToDto(dashboard));
    }


    //dashboard 조회
    @GetMapping("/{userId}/{id}")
    public ResponseEntity<?> getDashboard(
            @PathVariable(name = "userId") String userId,
            @PathVariable(name = "id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        try{
            //현재 로그인한 유저와 요청된 userId 비교
            if(!userPrincipal.getUser().getUserId().equals(userId)){
                return new ResponseEntity<>("다른 사용자의 대시보드 조회 금지", HttpStatus.FORBIDDEN);
            }
            DashboardDto dto = dashboardService.getDashboardById(id, userPrincipal.getUser());
            return ResponseEntity.ok(dto);

        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //dashboard 전체 조회
    @GetMapping("/all")
    public ResponseEntity<?> getAllDashboard(
            @AuthenticationPrincipal UserPrincipal userPrincipal){


        List<DashboardDto> dto = dashboardService.getAllDashboard(userPrincipal.getUser());

        return ResponseEntity.ok(dto);

    }



    //dashboard 삭제
    //UserPrincipal은 세션 쿠키 기반 인증 결과로 주입된 사용자 정보
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDashboard(
            @PathVariable(name = "id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        dashboardService.deleteDashboard(id, userPrincipal.getUser());
        return ResponseEntity.ok("dashboard delete Successfully");

    }
}
