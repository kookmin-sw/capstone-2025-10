package capstone.offflow.Login.Controller;

import capstone.offflow.Login.Dto.LoginRequestDto;
import capstone.offflow.Login.Service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest,
                                   HttpServletRequest request){
        String userId = loginService.login(loginRequest, request); //세션 생성
        return ResponseEntity.ok().body(userId); //user ID 반환
    }
}
