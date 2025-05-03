package capstone.offflow.Event.Dto;


import capstone.offflow.Event.Domain.Event;
import capstone.offflow.Event.Domain.EventCondition;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class EventConditionDto {

    @NonNull
    private Long id;

    private String indicatorName;
    private String operator; //연산자
    private String value;

    private Long eventId;


    //Entity -> Dto
    public static EventConditionDto convertToDto(EventCondition eventCondition) {
        return EventConditionDto.builder()
                .id(eventCondition.getId())
                .indicatorName(eventCondition.getIndicatorName())
                .operator(eventCondition.getOperator())
                .value(eventCondition.getValue())
                .eventId(eventCondition.getEvent().getId())
                .build();
    }


    //Dto -> Entity (생성/수정용)
    public static EventCondition convertToEntity(EventConditionDto eventConditionDto, Event event) {
        EventCondition eventCondition = new EventCondition();
        eventCondition.setId(eventConditionDto.getId());
        eventCondition.setIndicatorName(eventConditionDto.getIndicatorName());
        eventCondition.setOperator(eventConditionDto.getOperator());
        eventCondition.setValue(eventConditionDto.getValue());
        eventCondition.setEvent(event);
        return eventCondition;
    }
}
