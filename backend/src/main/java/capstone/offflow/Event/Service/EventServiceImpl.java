package capstone.offflow.Event.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import capstone.offflow.Event.Dto.EventConditionDto;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.Event.Repository.EventConditionRepository;
import capstone.offflow.Event.Repository.EventRepository;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EventServiceImpl implements EventService {


    private final EventRepository eventRepository;
    private final EventConditionRepository eventConditionRepository;
    private final DashboardRepository dashboardRepository;

    //이벤트 생성 method
    //이벤트 조건추가 logic 필요
    @Override
    @Transactional
    public Event createEvent(EventDto eventDto, User user) {

        //1. 대시보드 소유 검증
        Dashboard dashboard = dashboardRepository.findByIdAndUser(eventDto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));


        //2. 조건 비어있는지 검증
        List<EventConditionDto> conditionDto = eventDto.getEventConditions();

        if(conditionDto == null || conditionDto.isEmpty()){
            throw new IllegalArgumentException("이벤트 조건은 1개 이상이어야 합니다.");
        }

        Event event = EventDto.convertToEntity(eventDto, dashboard);
        Event savedEvent = eventRepository.save(event);

        log.info("Event 생성 완료 - {}", savedEvent.getId());

        return savedEvent;
    }

    //이벤트 조건 생성
    @Override
    public EventCondition createEventCondition(EventConditionDto eventConditionDto, User user) {

        //1. Event 존재여부 확인
        Event event = eventRepository.findById(eventConditionDto.getEventId())
                .orElseThrow(() -> new EntityNotFoundException("이벤트를 찾을 수 없습니다."));

        // 2. 유저의 dashboard에 속한 이벤트인지 확인 (보안상 중요)
        if (!event.getDashboard().getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("해당 이벤트에 대한 권한이 없습니다.");
        }

        EventCondition eventCondition = EventConditionDto.convertToEntity(eventConditionDto, event);

        eventConditionRepository.save(eventCondition);

        return eventCondition;
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

    //이벤트 조건 삭제 위한 조회 Method
    @Override
    public EventConditionDto getByEventConditionId(Long conditionId, User user) {
        return null;
    }

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
