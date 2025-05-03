package capstone.offflow.Event.Service;

import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.Event.Repository.EventRepository;
import capstone.offflow.User.Domain.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EventServiceImpl implements EventService {


    private final EventRepository eventRepository;
    private final DashboardRepository dashboardRepository;


    @Override
    public Event createEvent(EventDto event, User user) {
        return null;
    }

    @Override
    public Event updateEvent(Long eventId, EventDto event, User user) {
        return null;
    }

    @Override
    public List<EventDto> getByEventId(Long eventId, User user) {
        return List.of();
    }

    @Override
    public List<EventDto> getByDashboardId(Long dashboardId, User user) {
        return List.of();
    }

    @Override
    public void deleteEvent(Long id, User user) {

    }
}
