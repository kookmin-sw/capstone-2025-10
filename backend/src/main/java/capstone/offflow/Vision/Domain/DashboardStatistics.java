package capstone.offflow.Vision.Domain;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Event.Domain.Event;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Dashboard 통계 Entity
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private int totalVisitors; //총 방문자수 (중복 허용)
    private int averageStayTime; //평균 체류시간

    @Temporal(TemporalType.TIMESTAMP)
    private Date calculatedTime; //통계 측정 일자

    //성비
    private Double maleRatio; //null이면 전체 통계
    private Double femaleRatio;

    @Lob //긴 Json 저장용 애노테이션
    @JoinColumn(name = "age_group_ratio_json")
    private String ageGroupRatioJson; //연령대 Json


    @ManyToOne(optional = false) //항상 대시보드에 소속 (1개 대시보드 : 여러 대시보드 통계)
    @JoinColumn(name = "dashboard_id")
    private Dashboard dashboard;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;

}
