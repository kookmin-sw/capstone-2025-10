package capstone.offflow.Event.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import capstone.offflow.Event.Dto.EventConditionDto;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.Event.Repository.EventRepository;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.EntityNotFoundException;
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

    //이벤트 생성 method
    //이벤트 조건추가 logic 필요
    @Override
    public Event createEvent(EventDto eventDto, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(eventDto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        Event event = EventDto.convertToEntity(eventDto, dashboard);

    }

    //이벤트 조건 생성
    @Override
    public EventCondition createEventCondition(EventConditionDto eventConditionDto, User user) {


    }

    //이벤트 수정
    @Override
    public Event updateEvent(Long eventId, EventDto event, User user) {
        return null;
    }


    //이벤트 조건 수정
    @Override
    public EventCondition updateEventCondition(Long ConditionId, EventConditionDto dto, User user) {
        return null;
    }


    /**
     * 이벤트 조건도 함께 조회 하기
     */

    @Override
    public EventDto getByEventId(Long eventId, User user) {
        return null;
    }


    @Override
    public List<EventDto> getAllByEventId(Long eventId, User user) {
        return null;
    }

    @Override
    public List<EventDto> getAllByDashboardId(Long dashboardId, User user) {
        return null;
    }


    //이벤트 삭제
    @Override
    public void deleteEvent(Long id, User user) {

    }

    //이벤트 조건 삭제
    @Override
    public void deleteEventCondition(Long eventId, Long eventConditionId, User user) {

    }
}
