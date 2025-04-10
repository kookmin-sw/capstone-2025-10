package capstone.offflow.Login.Controller;

import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Service.UserPrincipal;
import capstone.offflow.User.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 1. Session check
 * 2. 인증 상태 확인
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @GetMapping("/check")
    public ResponseEntity<?> checkSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        if (userPrincipal == null){
            return ResponseEntity.ok("Not_Logged_in");
        }
        User user = userService.getUserById(userPrincipal.getUser().getUserId());

        Map<String, String> response = new HashMap<>();

        response.put("userId", user.getUserId());
        response.put("companyName", user.getCompanyName());
        response.put("managerName", user.getManagerName());
        response.put("messageCount", String.valueOf(user.getMessageCount())); //int -> String으로 변환
        response.put("surveyCount", String.valueOf(user.getSurveyCount()));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
