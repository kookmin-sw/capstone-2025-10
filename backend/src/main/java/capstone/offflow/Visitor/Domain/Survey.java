package capstone.offflow.Visitor.Domain;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String surveyName;


    @Temporal(TemporalType.TIMESTAMP)
    private Date registerDate;


    //dashboard는 여러개의 설문조사가능
    //지연 로딩으로 하지않으면 방문객 조회할때마다 모든 User정보를 가져옴 -> 불필요한 쿼리
    @ManyToOne(fetch = FetchType.LAZY) //ManyToOne defaulte => 즉시로딩이므로 지연로딩으로 진행
    @JoinColumn(name="dashboard_id")
    private Dashboard dashboard;


}
