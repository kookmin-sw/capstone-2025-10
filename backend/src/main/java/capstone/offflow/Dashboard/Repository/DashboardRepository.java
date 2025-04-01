package capstone.offflow.Dashboard.Repository;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * EntityGraph를 활용해 N+1 쿼리문제 해결
 * 지연 로딩 -> 즉시 로딩으로 변경 (Fetch join)
 */

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {

    //대시보드 조회 (사용자기반)
    @EntityGraph(attributePaths = {"sections", "sections.products"}) //대시보드 + 섹션 + 상품 join을 통해 한번의 쿼리로 가져옴
    Optional<Dashboard> findByIdAndUser(Long id, User user);

    List<Dashboard> findAllByUser(User user);

}
