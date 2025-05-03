package capstone.offflow.Event.Controller;


import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Dto.EventDto;
import capstone.offflow.Event.Service.EventService;
import capstone.offflow.User.Service.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @PostMapping
    public ResponseEntity<?> createEvent(
            @RequestBody @Validated EventDto eventDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Event event = eventService.createEvent(eventDto, userPrincipal.getUser());

    }
}
