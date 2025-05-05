package capstone.offflow.Event.Repository;

import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface EventConditionRepository extends JpaRepository<EventCondition, Long> {


    Optional<EventCondition> findByIdAndEvent(Long eventConditionId, Event event);

    //간접조건 체이닝
    //EventCondition → Event → Dashboard → User 구조이므로, JPQL 또는 메서드 이름을 통해 간접 경로를 지정해야함.
    Optional<EventCondition> findByIdAndEvent_Dashboard_User(Long id, User user);
}
