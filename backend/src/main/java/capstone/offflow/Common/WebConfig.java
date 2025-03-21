package capstone.offflow.Common;


import capstone.offflow.Filter.LogFilter;
import jakarta.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class WebConfig {


    @Bean
    public FilterRegistrationBean logFilter(){
        FilterRegistrationBean<Filter> filterRegistrationBean =
                new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new LogFilter());
        filterRegistrationBean.setOrder(1); //필터 실행되는 순서 (WAS이후 첫번째 실행)
        filterRegistrationBean.addUrlPatterns("/*");
        return filterRegistrationBean;
    }

}
