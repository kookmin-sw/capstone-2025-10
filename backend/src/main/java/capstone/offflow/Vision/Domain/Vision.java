package capstone.offflow.Vision.Domain;


import capstone.offflow.Dashboard.Domain.Dashboard;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * 비전 카메라 정보 Entity
 */


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceType;

    private String deviceStatus;

    private Date installationDate; //설치 날짜

    @ManyToOne(optional = false) //항상 대시보드에 소속 (1개 대시보드 : 여러 대시보드 통계)
    @JoinColumn(name = "dashboard_id")
    private Dashboard dashboard;

}
