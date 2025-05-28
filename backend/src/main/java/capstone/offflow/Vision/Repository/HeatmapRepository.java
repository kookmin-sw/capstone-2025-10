package capstone.offflow.Vision.Repository;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Domain.Heatmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface HeatmapRepository extends JpaRepository<Heatmap,Long> {

    List<Heatmap> findAllByDashboard_IdAndDashboard_User(Long dashboardId, User user);

    List<Heatmap> findTop1ByDashboard_IdAndDashboard_UserOrderByDetectedTimeDesc(Long dashboardId, User user);

}
