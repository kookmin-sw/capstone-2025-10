package capstone.offflow.Event.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Event.Domain.ComparisonOperator;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import capstone.offflow.Event.Dto.EventConditionDto;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.Event.Repository.EventConditionRepository;
import capstone.offflow.Event.Repository.EventRepository;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.EntityNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


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
    public Event createEvent(EventDto eventDto, User user) {

        //1. 대시보드 소유 검증
        Dashboard dashboard = dashboardRepository.findByIdAndUser(eventDto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));


        //2. 조건 비어있는지 검증
        List<EventConditionDto> conditionDto = eventDto.getEventConditions();

        if(conditionDto == null || conditionDto.isEmpty()){
            throw new IllegalArgumentException("이벤트 조건은 1개 이상이어야 합니다.");
        }

        //3. 이벤트 생성
        Event event = EventDto.convertToEntity(eventDto, dashboard);

        // 4. 이벤트 조건 생성 및 연결
        List<EventCondition> eventConditions = conditionDto.stream()
                .map(dto -> EventConditionDto.convertToEntity(dto, event)) // 반드시 event를 주입
                .collect(Collectors.toList());

        event.setEventConditions(eventConditions);

        //5. 이벤트 저장
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

    @Override
    public Event updateEvent(Long eventId, EventDto eventDto, User user) {

        Event event = eventRepository.findByIdAndDashboard_User(eventId, user)
                .orElseThrow(() -> new EntityNotFoundException("이벤트를 찾을 수 없습니다."));

        List<EventCondition> currentConditions = event.getEventConditions();

        // 1. 요청으로 들어온 조건 ID 리스트 수집
        List<Long> incomingIds = eventDto.getEventConditions().stream()
                .map(EventConditionDto::getId)
                .filter(id -> id != null)
                .toList();

        // 2. 삭제 대상: 현재 있는 조건 중 요청에 없는 것
        List<EventCondition> toRemove = currentConditions.stream()
                .filter(ec -> ec.getId() != null && !incomingIds.contains(ec.getId()))
                .toList();
        toRemove.forEach(currentConditions::remove); // JPA가 orphanRemoval로 삭제

        // 3. 수정 또는 추가
        for (EventConditionDto dto : eventDto.getEventConditions()) {
            if (dto.getId() == null) {
                // 신규 조건 추가
                EventCondition newCondition = EventConditionDto.convertToEntity(dto, event);
                currentConditions.add(newCondition);
            } else {
                // 기존 조건 수정
                currentConditions.stream()
                        .filter(ec -> ec.getId().equals(dto.getId()))
                        .findFirst()
                        .ifPresent(ec -> {
                            ec.setIndicatorName(dto.getIndicatorName());
                            ec.setOperator(ComparisonOperator.from(dto.getOperator()));
                            ec.setValue(dto.getValue());
                        });
            }
        }

        // 이벤트 정보 수정
        event.setEventName(eventDto.getEventName());
        event.setDescription(eventDto.getDescription());

        return event;
    }


    /**
     * 이벤트 조건도 함께 조회 하기
     */
    @Override
    @Transactional(readOnly = true)
    public EventDto getByEventId(Long eventId, User user) {
        Event event = eventRepository.findByIdAndDashboard_User(eventId,user)
                .orElseThrow(() -> new EntityNotFoundException("이벤트를 찾을 수 없습니다."));

        return EventDto.convertToDto(event);
    }



    @Override
    @Transactional(readOnly = true)
    public List<EventDto> getAllByDashboardId(Long dashboardId, User user) {
        List<Event> events = eventRepository.findAllByDashboardIdAndDashboard_User(dashboardId, user);

        return events.stream()
                .map(EventDto::convertToDto)
                .collect(Collectors.toList());
    }


    //이벤트 삭제
    @Override
    public void deleteEvent(Long id, User user) {
        //1. Event 존재여부 확인
        Event event = eventRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("이벤트를 찾을 수 없습니다."));

        //2. Event 삭제
        eventRepository.delete(event);
        log.info("이벤트 조건 삭제 완료 {}", event.getId());
    }

      //이벤트 조건 삭제 위한 조회 Method
//    @Override
//    @Transactional(readOnly = true)
//    public EventConditionDto getByEventConditionId(Long conditionId, User user) {
//        EventCondition condition = eventConditionRepository.findByIdAndEvent_Dashboard_User(conditionId, user)
//                .orElseThrow(() -> new EntityNotFoundException("이벤트조건을 찾을 수 없습니다."));
//
//        return EventConditionDto.convertToDto(condition);
//    }

    //이벤트 조건 수정
//    @Override
//    public EventCondition updateEventCondition(Long conditionId, EventConditionDto dto, User user) {
//
//        //1. 이벤트 조건 조회
//        EventCondition condition = eventConditionRepository.findByIdAndEvent_Dashboard_User(conditionId, user)
//                .orElseThrow(() -> new EntityNotFoundException("해당 이벤트 조건을 찾을 수 없습니다."));
//
//        condition.setIndicatorName(dto.getIndicatorName());
//        condition.setOperator(ComparisonOperator.from(dto.getOperator())); // 한글 → Enum
//        condition.setValue(dto.getValue());
//
//        return condition;
//    }

//    //이벤트 조건 삭제
//    @Override
//    public void deleteEventCondition(Long eventId, Long eventConditionId, User user) {
//        //1. Event 존재여부 확인
//        Event event = eventRepository.findByIdAndDashboard_User(eventId, user)
//                .orElseThrow(() -> new EntityNotFoundException("이벤트를 찾을 수 없습니다."));
//
//        //2. Event 조건 존재여부 확인
//        EventCondition eventCondition = eventConditionRepository.findByIdAndEvent(eventConditionId, event)
//                .orElseThrow(() -> new EntityNotFoundException("이벤트 조건을 찾을 수 없습니다."));
//
//        eventConditionRepository.delete(eventCondition);
//        log.info("이벤트 조건 삭제 완료 {}", eventCondition.getId());
//    }
}
