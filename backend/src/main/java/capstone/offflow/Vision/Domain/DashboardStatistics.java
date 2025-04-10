package capstone.offflow.Vision.Domain;

import capstone.offflow.Dashboard.Domain.Dashboard;
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

    private Date calculatedTime; //통계 측정 일자


    @ManyToOne(optional = false) //항상 대시보드에 소속 (1개 대시보드 : 여러 대시보드 통계)
    @JoinColumn(name = "dashboard_id")
    private Dashboard dashboard;

}
