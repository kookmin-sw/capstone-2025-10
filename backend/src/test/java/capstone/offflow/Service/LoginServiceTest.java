package capstone.offflow.Service;


import capstone.offflow.Login.Dto.LoginRequestDto;
import capstone.offflow.Login.Service.LoginServiceImpl;
import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LoginServiceTest {

    @InjectMocks
    private LoginServiceImpl loginService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    // HTTP 요청이 없으니 가짜 request를 만들기
    @Mock
    private HttpServletRequest request;

    @Test
    @DisplayName("로그인 성공 테스트")
    void loginSuccessTest(){
        //given
        LoginRequestDto dto = new LoginRequestDto();
        dto.setUserId("test");
        dto.setPassword("1234");

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(dto.getUserId(), dto.getPassword());

        Authentication mockAuth = mock(Authentication.class); //인증 객체 Mock

        when(authenticationManager.authenticate(token)).thenReturn(mockAuth);
        lenient().when(userRepository.findByUserId("test")).thenReturn(Optional.of(new User()));

        //when
        String result = loginService.login(dto, request);


        //then
        Assertions.assertThat(result).isEqualTo("test");
        verify(authenticationManager, times(1)).authenticate(any());
        verify(request, times(1)).getSession(true);

    }

    @Test
    @DisplayName("로그인 실패 - 비밀번호 틀림")
    void loginFailPasswordTest(){
        //given
        LoginRequestDto dto = new LoginRequestDto();
        dto.setUserId("test");
        dto.setPassword("1234");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("비밀번호 틀림"));

        //then
        Assertions.assertThatThrownBy(() -> loginService.login(dto, request))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("아이디 또는 비밀번호가 틀렸습니다.");

    }


    @Test
    @DisplayName("로그인 실패 - 없는 유저")
    void loginFailNoUserTest(){
        //given
        LoginRequestDto dto = new LoginRequestDto();
        dto.setUserId("test");
        dto.setPassword("1234");

        Authentication mockAuth = mock(Authentication.class);
        when(authenticationManager.authenticate(any())).thenReturn(mockAuth);
        when(userRepository.findByUserId("test")).thenReturn(Optional.empty());


        //then
        assertThatThrownBy(() -> loginService.login(dto, request))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("사용자 없음");

    }


}
