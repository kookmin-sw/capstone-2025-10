package capstone.offflow.Vision.Repository;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Domain.Heatmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeatmapRepository extends JpaRepository<Heatmap,Long> {

    List<Heatmap> findAllByDashboard_User(Long dashboardId, User user);
}
