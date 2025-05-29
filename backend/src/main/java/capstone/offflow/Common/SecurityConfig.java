package capstone.offflow.Common;

import capstone.offflow.User.Service.UserService;
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

    //SecurityConfig에서는 UserDetailsService 인터페이스만 봄
    //UserServiceImpl은 SecurityConfig를 몰라야함 -> 순환참조 현상 제거
    private final UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/login", "/api/users/register", "/api/survey/surveyAnswer").permitAll() // 회원가입/로그인은 로그인 없이 가능
                        .requestMatchers("/api/users/**").authenticated() // /api/users/ 하위는 로그인만 하면 접근 가능
                        .anyRequest().authenticated())
                .logout(logout -> logout
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

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


}


