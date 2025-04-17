package capstone.offflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling //Redis flush를 위함
public class OffflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(OffflowApplication.class, args);
	}

}
