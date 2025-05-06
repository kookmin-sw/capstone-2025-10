package capstone.offflow.Event.Dto;


import capstone.offflow.Event.Domain.ComparisonOperator;
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


    // Entity → Dto
    public static EventConditionDto convertToDto(EventCondition eventCondition) {
        return EventConditionDto.builder()
                .id(eventCondition.getId())
                .indicatorName(eventCondition.getIndicatorName())
                .operator(eventCondition.getOperator().getDisplayName()) // Enum → 한글 표현
                .value(eventCondition.getValue())
                .eventId(eventCondition.getEvent().getId())
                .build();
    }

    // Dto → Entity
    public static EventCondition convertToEntity(EventConditionDto dto, Event event) {
        EventCondition condition = new EventCondition();
        condition.setId(dto.getId());
        condition.setIndicatorName(dto.getIndicatorName());
        condition.setOperator(ComparisonOperator.from(dto.getOperator())); // 한글 → Enum
        condition.setValue(dto.getValue());
        condition.setEvent(event);
        return condition;
    }
}
