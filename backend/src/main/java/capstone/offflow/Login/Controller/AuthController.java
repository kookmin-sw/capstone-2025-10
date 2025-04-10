package capstone.offflow.Login.Controller;

import capstone.offflow.User.Service.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 1. Session check
 * 2. 인증 상태 확인
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/check")
    public ResponseEntity<String> checkSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        if (userPrincipal == null){
            return ResponseEntity.ok("Not_Logged_in");
        }
        return ResponseEntity.ok("Logged_in");
    }
}
