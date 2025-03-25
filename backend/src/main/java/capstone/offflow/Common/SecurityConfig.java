package capstone.offflow.Common;

import capstone.offflow.User.Service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserServiceImpl userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) //SPA방식 react (front)와 api 통신위해 -> 토큰 받을방법 X
                .cors(cors -> {}) // 필요에 따라 CORS 설정 추가
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/login", "/api/users/join").permitAll()
                        .anyRequest().authenticated()) // 나머지 요청은 인증 필요
                .logout((logout) -> logout
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true)) //로그아웃 이후 전체 세션 삭제
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //세션생성 및 사용여부에 대한 정책
                .formLogin((formLogin) -> formLogin
                        .loginPage("/login") //Login URL
                        .defaultSuccessUrl("/")  //성공시에 이동하는 페이지 루트 URL
                );


        return http.build();
    }

    /**
     * 내부에서 비밀번호 검증
     * 로그인 처리 담당하는 핵심 로직 (수동처리)
     * 수동처리 -> 로그인 API 활용해야하기 때문에
     * 인증 요청을 받은 후 인증처리 수행 후 성공시 Authentication 객체 반환, 실패시 예외
     */
    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
                                                       PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(); //실질적으로 DB에서 유저정보를 가져와서 비밀번호 비교까지 수행하는 실제 실행자
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }



    //PW encoding
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}


