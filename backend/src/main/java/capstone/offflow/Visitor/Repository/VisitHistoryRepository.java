package capstone.offflow.Visitor.Repository;

import capstone.offflow.Visitor.Domain.VisitHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitHistoryRepository extends JpaRepository<VisitHistory, Long> {


}
