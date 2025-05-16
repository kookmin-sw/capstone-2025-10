package capstone.offflow.Common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 프론트쪽에서 요청 (port가 다른 origin request)
 * 구체적인 Cors 승인 정책 class
 */

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfiguer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 api 수정
                        .allowedOrigins("http://10.190.200.64:3000") // 프론트 주소 명시
                        .allowedOrigins("http://localhost:3000") // 프론트 주소 명시
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true) // 세션, 쿠키 같이 보내려면 꼭 필요
                        .allowedHeaders("*")
                        .maxAge(3600); // Preflight 요청 캐시 시간 (1시간)
            }
        };
    }
}
