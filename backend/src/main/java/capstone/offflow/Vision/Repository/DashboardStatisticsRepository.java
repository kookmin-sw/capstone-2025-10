package capstone.offflow.Vision.Repository;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Vision.Domain.DashboardStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardStatisticsRepository extends JpaRepository<DashboardStatistics, Long> {
    List<DashboardStatistics> findByDashboard(Dashboard dashboard);
    List<DashboardStatistics> findByDashboardAndSection(Dashboard dashboard, Section section);

}
