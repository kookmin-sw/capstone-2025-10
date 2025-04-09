package capstone.offflow.Dashboard.Repository;

import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface SectionRepository extends JpaRepository<Section, Long> {

    // 섹션 조회시 대시보드 조회 필수
    @Query("SELECT s FROM Section s JOIN FETCH s.dashboard d WHERE s.id = :id AND d.user = :user")
    Optional<Section> findByIdAndDashboard_User(@Param("id") Long id, @Param("user") User user);

}
