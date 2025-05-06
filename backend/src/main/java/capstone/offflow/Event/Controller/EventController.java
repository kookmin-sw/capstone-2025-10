package capstone.offflow.Event.Controller;


import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import capstone.offflow.Event.Dto.EventConditionDto;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.Event.Service.EventService;
import capstone.offflow.User.Service.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/event")
@Slf4j
public class EventController {

    private final EventService eventService;


    //event 생성
    @PostMapping
    public ResponseEntity<?> createEvent(
            @RequestBody @Validated EventDto eventDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Event event = eventService.createEvent(eventDto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(EventDto.convertToDto(event)); //static이므로 클래스이름으로 호출 해야함 (인스턴스 호출X)
    }

    //event 조건 생성
    @PostMapping("/{eventId}/conditions")
    public ResponseEntity<?> createEventCondition(
            @RequestBody @Validated EventConditionDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        EventCondition eventCondition = eventService.createEventCondition(dto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(EventConditionDto.convertToDto(eventCondition));
    }


    //event 조회 (dashboard Id)
    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getAllEventBydashboardId(
            @PathVariable(name = "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        List<EventDto> eventDto = eventService.getAllByDashboardId(dashboardId, userPrincipal.getUser());
        return ResponseEntity.ok(eventDto);
    }


    //event 수정 (이름, 설명)
    @PatchMapping("/{eventId}")
    public ResponseEntity<?> updateEvent(
            @PathVariable(name = "eventId") Long eventId,
            @RequestBody EventDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Event event = eventService.updateEvent(eventId, dto, userPrincipal.getUser());
        return ResponseEntity.ok(EventDto.convertToDto(event));
    }


    //event 조건 수정
    @PatchMapping("/{eventId}/conditions/{eventConditionId}")
    public ResponseEntity<?> updateEventCondition(
            @PathVariable(name = "eventId") Long eventId,
            @RequestBody EventConditionDto conditionDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        EventCondition eventCondition = eventService.updateEventCondition(eventId, conditionDto, userPrincipal.getUser());
        return ResponseEntity.ok(EventConditionDto.convertToDto(eventCondition));
    }



    //event 삭제
    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEvent(
            @PathVariable(name = "eventId") Long eventId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        EventDto eventDto = eventService.getByEventId(eventId, userPrincipal.getUser());

        eventService.deleteEvent(eventId, userPrincipal.getUser());
        return ResponseEntity.ok(eventDto);
    }

    //eventCondition 삭제
    //eventId를 통해 잘못된 event에 대한 condition삭제 방지 가능
    @DeleteMapping("/{eventId}/condition/{eventConditionId}")
    public ResponseEntity<?> deleteEventCondition(
            @PathVariable(name = "eventId") Long eventId,
            @PathVariable(name = "eventConditionId") Long eventConditionId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        EventConditionDto conditionDto = eventService.getByEventConditionId(eventConditionId, userPrincipal.getUser());
        eventService.deleteEventCondition(eventId, eventConditionId, userPrincipal.getUser());
        return ResponseEntity.ok(conditionDto);
    }
}
