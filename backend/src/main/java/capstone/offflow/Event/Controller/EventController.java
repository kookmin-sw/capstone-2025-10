package capstone.offflow.Event.Controller;


import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.Event.Service.EventService;
import capstone.offflow.User.Service.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    //event 조회 (event Id)


    //event 조회 (dashboard Id)


    //event 수정 (이름, 설명)



    //event 삭제



}
