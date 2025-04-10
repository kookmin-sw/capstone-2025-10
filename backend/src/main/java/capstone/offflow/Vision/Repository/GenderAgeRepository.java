package capstone.offflow.Vision.Repository;

import capstone.offflow.Vision.Domain.GenderAge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenderAgeRepository extends JpaRepository<GenderAge, Long> {
}
