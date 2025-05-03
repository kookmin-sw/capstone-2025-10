package capstone.offflow.Event.Dto;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class EventDto {

    @NonNull
    private Long id;
    private String eventName;
    private String description;

    private List<EventCondition> eventConditions;

    @NonNull
    private Long dashboardId;


    //Entity -> Dto (조회용)
    public static EventDto convertToDto(Event event) {
        return EventDto.builder()
                .id(event.getId())
                .eventName(event.getEventName())
                .description(event.getDescription())
                .eventConditions(event.getEventConditions())
                .dashboardId(event.getDashboard().getId())
                .build();
    }

    //Dto -> Entity (생성/수정용)
    public static Event convertToEntity(EventDto eventDto, Dashboard dashboard) {
        Event event = new Event();
        event.setId(eventDto.getId());
        event.setEventName(eventDto.getEventName());
        event.setDescription(eventDto.getDescription());
        event.setEventConditions(eventDto.getEventConditions());
        event.setDashboard(dashboard);
        return event;
    }

}
