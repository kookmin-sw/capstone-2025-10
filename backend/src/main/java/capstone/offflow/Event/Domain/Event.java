package capstone.offflow.Event.Domain;


import capstone.offflow.Dashboard.Domain.Dashboard;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String eventName;

    private String description;


    //이벤트 -> 조건 연결
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true) //event삭제시 조건 전부 삭제
    private List<EventCondition> eventConditions;


    @ManyToOne(optional = false) //항상 대시보드에 소속
    @JoinColumn(name = "dashboard_id")
    private Dashboard dashboard;



}
