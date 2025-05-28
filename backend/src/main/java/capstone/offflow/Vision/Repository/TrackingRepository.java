package capstone.offflow.Vision.Repository;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Domain.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, Long> {

    List<Tracking> findAllByDashboard_IdAndDashboard_User(Long dashboardId, User user);

    @Query("SELECT t FROM Tracking t WHERE t.dashboard.id = :dashboardId AND t.dashboard.user = :user AND t.detectedTime BETWEEN :start AND :end")
    List<Tracking> findByDashboardIdAndUserAndDetectedTimeBetween(@Param("dashboardId") Long dashboardId,
                                                                  @Param("user") User user,
                                                                  @Param("start") Date start,
                                                                  @Param("end") Date end);
}
