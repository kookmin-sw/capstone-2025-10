package capstone.offflow.Dashboard.Repository;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {

    //대시보드 조회 (사용자기반)
    Optional<Dashboard> findByIdAndUser(Long id, User user);

    List<Dashboard> findAllByUser(User user);

}
