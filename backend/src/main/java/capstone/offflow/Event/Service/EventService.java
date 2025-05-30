package capstone.offflow.Event.Service;

import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import capstone.offflow.Event.Dto.EventConditionDto;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.User.Domain.User;

import java.util.List;

public interface EventService {

    //이벤트 생성
    Event createEvent(EventDto event, User user);

    //이벤트 조건 생성
    EventCondition createEventCondition(EventConditionDto eventConditionDto, User user);


    //이벤트 수정
    Event updateEvent(Long eventId, EventDto event, User user);



    //이벤트 조회 (event id) - 1개
    EventDto getByEventId(Long eventId, User user);


    //이벤트 조회 (dashboard id)
    List<EventDto> getAllByDashboardId(Long dashboardId, User user);

    //이벤트 삭제
    void deleteEvent(Long id, User user);


}
