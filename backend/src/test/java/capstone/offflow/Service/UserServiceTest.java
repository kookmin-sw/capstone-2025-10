package capstone.offflow.Service;

import capstone.offflow.Common.EncoderConfig;
import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Repository.UserRepository;
import capstone.offflow.User.Service.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;


@Slf4j
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    //Mock으로 선언된 필드 (레포지토리, 인코더)를 의존성 주입해줌 (자동)
    //인터페이스는 인스턴스화 불가능 -> 구현체에 해야함
    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;



    @Test
    @DisplayName("회원 조회 테스트")
    void getUserByIdTest() {
        // given
        String userId = "testUser";
        User user = new User();
        user.setUserId(userId);

        when(userRepository.findByUserId(userId)).thenReturn(user); // ⭐ 먼저 stub 설정

        System.out.println("userService class = " + userService.getClass());
        System.out.println("userRepository in userService = " + userService.getUserById("testUser"));

        // when
        User result = userService.getUserById(userId);

        // then
        System.out.println("result is = " + result);
        assertThat(result).isNotNull();
        assertThat(result.getUserId()).isEqualTo(userId);
        verify(userRepository, times(2)).findByUserId(userId); // 2번 호출한 셈이니까 2로
    }



    @Test
    @DisplayName("회원 생성 테스트 - 성공")
    void saveUserTest() {
        // given
        User user = new User();
        user.setUserId("testUser1");
        user.setPassword("1234");
        user.setCompanyName("TestCorp");
        user.setManagerName("홍길동");

        // 이미 존재하는지 확인
        when(userRepository.existsByUserId("testUser1")).thenReturn(false);

        // 비밀번호 인코딩 설정
        when(passwordEncoder.encode("1234")).thenReturn("encodedPassword");

        // 🔥 핵심: save() 호출 시 전달된 user 객체를 그대로 반환
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        User result = userService.registerUser(user);

        log.info("등록된 유저 ID: {}", result.getUserId());

        // then
        assertThat(result).isNotNull();
        assertThat(result.getUserId()).isEqualTo("testUser1");
        assertThat(result.getPassword()).isEqualTo("encodedPassword");
    }


    @Test
    @DisplayName("회원 생성 테스트 - 실패")
    void saveUserFailTest(){

    }


    @Test
    @DisplayName("회원 삭제 테스트")
    void deleteUserTest(){

    }

}

