package capstone.offflow.Vision.Repository;

import capstone.offflow.Vision.Domain.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackingRepository extends JpaRepository<Tracking, Long> {
}
