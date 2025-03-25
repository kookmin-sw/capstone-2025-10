package capstone.offflow.Login.Service;


import capstone.offflow.Login.Dto.LoginRequestDto;
import capstone.offflow.User.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * 스프링 시큐리티 기반 세션 로그인 구현
 */

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @Override
    public String login(LoginRequestDto loginRequest, HttpServletRequest request) {
        try{
            //spring security 활용해 토큰 객체 생성 (userId, password 기반)
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(loginRequest.getUserId(), loginRequest.getPassword());

            //DB 사용자 조회 -> 비밀번호 비교 -> 인증 성공시 Authentication 객체 생성
            Authentication authentication = authenticationManager.authenticate(token);

            //UserId를 가진 사용자가 있는지 없는지 검증
            userRepository.findByUserId(loginRequest.getUserId())
                    .orElseThrow(() -> new RuntimeException("사용자 없음"));


            //세션을 생성하거나 이미 있으면 유지
            SecurityContextHolder.getContext().setAuthentication(authentication);
            request.getSession(true); // 세션 생성 (true : 없으면 새로 만든다는 뜻)

            return loginRequest.getUserId();
        } catch (AuthenticationException e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "아이디 또는 비밀번호가 틀렸습니다."); //401 error 보냄
        }

    }
}
