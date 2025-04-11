package capstone.offflow.Vision.Repository;

import capstone.offflow.Vision.Domain.GenderAge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenderAgeRepository extends JpaRepository<GenderAge, Long> {

    List<GenderAge> findByDashboardId(Long dashboardId);

}
