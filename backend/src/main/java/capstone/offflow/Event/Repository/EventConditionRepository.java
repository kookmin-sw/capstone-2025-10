package capstone.offflow.Event.Repository;

import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface EventConditionRepository extends JpaRepository<EventCondition, Long> {


    Optional<EventCondition> findByIdAndEvent(Long eventConditionId, Event event);
}
