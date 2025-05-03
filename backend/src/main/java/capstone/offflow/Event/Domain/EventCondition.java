package capstone.offflow.Event.Domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class EventCondition {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String indicatorName; //지표 이름

    private String operator; //연산자

    private String value;


    @ManyToOne(optional = false) //항상 event에 소속
    @JoinColumn(name = "event_id")
    private Event event;
}
