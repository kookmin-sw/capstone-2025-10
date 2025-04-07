package capstone.offflow.Visitor.Domain;

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
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String visitorName;

    private String phoneNumber;

    private Boolean privacyAccepted;
    private Boolean serviceAccepted;
    private Boolean marketingAccepted;
    private Boolean phoneVerified; //전화번호 인증 여부 (SMS인증)

    private Date registerDate;
    private Date reservationDate;

    //방문객과 유저사이의 관계
    //유저는 여러명의 방문객 보유 가능
    @ManyToOne(fetch = FetchType.LAZY) //ManyToOne defaulte => 즉시로딩이므로 지연로딩으로짆랭
    @JoinColumn(name="user_id", referencedColumnName = "userId") //FK컬럼, 참조대상
    private User user;


    //방문객과 대시보드사이의 관계
    //다:다 관계이므로 중간에 history entity 추가
    //방문객은 여러개의 팝업스토어 갈 수 있음
    @OneToMany(mappedBy = "visitor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VisitHistory> visitHistories = new ArrayList<>(); //빈 리스트 초기화 -> NPE 방지
    
}
