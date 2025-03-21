package capstone.offflow.User.Domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity(name = "user_entity")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String managerName;

    private int messageCount = 0;
    private int surveyCount = 0 ;

    private boolean privacyAccepted = true;
    private boolean serviceAccepted = true;

    //Date : 날짜만 저장 | TimeStamp : 날짜 or 시간 둘다저장
    @Temporal(TemporalType.TIMESTAMP)
    private Date registerDate = new Date();

}
