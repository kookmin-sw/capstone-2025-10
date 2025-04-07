package capstone.offflow.Visitor.Repository;


import capstone.offflow.Visitor.Domain.Visitor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Entity Graph 사용 O
 * -> 대시보드 이름까지 뽑아야하기 때문에
 */

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {


    //단건 조회 (ID기반 방문객 찾기)
    Optional<Visitor> findById(Long id);

    //여러건 조회 (사용자 기반 방문객 찾기)
    //방문객 -> 방문이력 -> 대시보드를 통해 대시보드 이름도 가져오기
    @EntityGraph(attributePaths = {"visitHistories", "visitHistories.dashboard"})
    List<Visitor> findAllByUserId(String userId);


}
