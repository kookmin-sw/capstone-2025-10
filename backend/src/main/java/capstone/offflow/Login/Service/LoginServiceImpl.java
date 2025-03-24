package capstone.offflow.Login.Service;


import capstone.offflow.Login.Dto.LoginRequestDto;
import capstone.offflow.User.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @Override
    public Long login(LoginRequestDto loginRequest, HttpServletRequest request) {
        return null;
    }
}
