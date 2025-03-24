package capstone.offflow.Common;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {}) // 필요에 따라 CORS 설정 추가
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/login", "/api/users/join").permitAll()
                        .anyRequest().authenticated()) // 나머지 요청은 인증 필요
                .logout((logout) -> logout
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true)) //로그아웃 이후 전체 세션 삭제
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션생성 및 사용여부에 대한 정책
                );

        return http.build();
    }
}


