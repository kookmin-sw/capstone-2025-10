package capstone.offflow.Event.Repository;


import capstone.offflow.Event.Domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface EventRepository extends JpaRepository<Event, Long> {
}
