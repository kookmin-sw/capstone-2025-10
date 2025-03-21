package capstone.offflow.Filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.UUID;


@Slf4j
public class LogFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException{
        log.info("log filter init");
    }


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();

        //http 요청을 구분하기 위해 요청당 임의의 uuid를 생성해둔다. (디버깅)
        //UUID : Universal Unique ID -> 중복될 가능성 매우 낮은 유니크 ID값
        String uuid = UUID.randomUUID().toString();

        //http 요청이 아닌 경우 고려
        try {
            log.info("REQUEST  [{}][{}]", uuid, requestURI); //uuid와 requestURI 출력
            chain.doFilter(request, response);
        } catch (Exception e){
            throw e;
        } finally {
            log.info("RESPONSE [{}][{}]", uuid, requestURI);
        }
    }

    @Override
    public void destroy(){
        log.info("log filter destroy");
    }
}
