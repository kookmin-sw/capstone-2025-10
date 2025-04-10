package capstone.offflow.Vision.Repository;

import capstone.offflow.Vision.Domain.Vision;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisionRepository extends JpaRepository<Vision, Long> {
}
