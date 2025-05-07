package capstone.offflow.Visitor.Domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SurveyAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String ageQuestion; // 1번
    private String genderQuestion; // 2번

    private String knowRoute; // 3번

    @Lob
    private String bestThing; //4번

    @Lob
    private String worstThing; //5번

    @Lob
    private String additionalThing; //6번


    @Temporal(TemporalType.TIMESTAMP)
    private Date registerDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visitor_id")
    private Visitor visitor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    private Survey survey;

}
