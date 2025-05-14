package capstone.offflow.Dashboard.Repository;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * EntityGraph를 활용해 N+1 쿼리문제 해결
 * 지연 로딩 -> 즉시 로딩으로 변경 (Fetch join)
 */

@Repository
public interface DashboardRepository extends JpaRepository<Dashboard, Long> {

    //대시보드 조회 (사용자기반)
    //섹션 → 상품은 나중에 Lazy 로 가져온다. (2개 동시에 fetch join시 error발생)
    //JPQL활용
    @Query("SELECT d FROM Dashboard d LEFT JOIN FETCH d.sections WHERE d.id = :id AND d.user = :user")
    Optional<Dashboard> findByIdAndUser(@Param("id") Long id, @Param("user") User user);

    //여러건 조회
    List<Dashboard> findAllByUser(User user);

}
