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
@AllArgsConstructor
@NoArgsConstructor
public class GenderAge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date detectedTime; //보낸 시간

    private String visitorLabel; //방문객 구분 라벨

    private String gender; //성별

    private String age; //나이


    @ManyToOne(optional = false) //항상 대시보드에 소속 (1개 대시보드 : 여러 대시보드 통계)
    @JoinColumn(name = "dashboard_id")
    private Dashboard dashboard;

}
