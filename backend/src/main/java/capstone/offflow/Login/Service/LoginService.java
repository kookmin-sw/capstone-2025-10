package capstone.offflow.Login.Service;


import capstone.offflow.Login.Dto.LoginRequestDto;
import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {

    Long login(LoginRequestDto loginRequest, HttpServletRequest request);
}
