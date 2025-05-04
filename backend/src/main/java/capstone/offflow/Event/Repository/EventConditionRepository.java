package capstone.offflow.Event.Repository;

import capstone.offflow.Event.Domain.EventCondition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventConditionRepository extends JpaRepository<EventCondition, Long> {

}
