package capstone.offflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling //Redis flush를 위함

// @ComponentScan(
// 		basePackages = "capstone.offflow",  // 전체 패키지
// 		excludeFilters = @ComponentScan.Filter(
// 				type = FilterType.REGEX,
// 				pattern = "capstone\\.offflow\\.Vision\\.(?!Controller\\.DashboardStatisticsController|Service\\.Business\\.DashboardStatistics.*|Repository\\.DashboardStatistics.*|Domain\\.DashboardStatistics.*|Dto\\.DashboardStatisticsDto).*"
// 		)
// )

@ComponentScan(basePackages = {
    "capstone.offflow", // ✅ 이거 넣으면 전체 포함
})

public class OffflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(OffflowApplication.class, args);
	}

}
