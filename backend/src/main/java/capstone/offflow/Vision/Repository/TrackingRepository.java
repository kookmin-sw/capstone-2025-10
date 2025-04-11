package capstone.offflow.Vision.Repository;

import capstone.offflow.Vision.Domain.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, Long> {

    List<Tracking> findByDashboardId(Long dashboardId);
}
