package capstone.offflow.Common;

import capstone.offflow.User.Service.UserServiceImpl;
import capstone.offflow.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    //PW encoding
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}


