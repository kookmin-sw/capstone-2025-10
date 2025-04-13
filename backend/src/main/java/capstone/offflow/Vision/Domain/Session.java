package capstone.offflow.Vision.Domain;


import capstone.offflow.Dashboard.Domain.Dashboard;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String visitorLabel; //방문객 라벨

    private Date sessionStartTime;
    private Date sessionEndTime;

    private int sessionDuration;

    private int visitedAreaCount; //방문한 구역 수

    private String visitedAreaSequence; //방문한 구역 순서

    private String areaStayDurations; //방문한 구역에 따른 체류시간


    @ManyToOne(optional = false) //항상 대시보드에 소속 (1개 대시보드 : 여러 대시보드 통계)
    @JoinColumn(name = "dashboard_id")
    private Dashboard dashboard;
}
