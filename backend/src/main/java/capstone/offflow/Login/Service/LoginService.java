package capstone.offflow.Login.Service;


import capstone.offflow.Login.Dto.LoginRequestDto;
import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {

    String login(LoginRequestDto loginRequest, HttpServletRequest request);
}
