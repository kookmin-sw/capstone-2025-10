package capstone.offflow.Event.Repository;


import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByIdAndDashboard_User(@Param("id") Long id, @Param("user") User user);


    List<Event> findAllByDashboard_IdAndDashboard_User(Long dashboardId, User user);
}
