package capstone.offflow.Dashboard.Repository;

import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SectionRepository extends JpaRepository<Section, Long> {

    //섹션 조회시 대시보드 조회 필수이므로 즉시로딩 채택
    @EntityGraph(attributePaths = {"dashboard"})
    Optional<Section> findByIdAndDashboard_User(Long id, User user);

}
