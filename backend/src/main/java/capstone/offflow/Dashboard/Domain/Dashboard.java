package capstone.offflow.Dashboard.Domain;


import capstone.offflow.User.Domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dashboardName;

    //낙관적 락 구현 -> 조회쪽에서 사용
    //동시 수정 불가능
    @Version
    private Long version;

    private String imageUrl;

    private Date startDate;
    private Date endDate;

    //한유저가 여러개의 대시보드 보유가능
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "userId") //FK컬럼, 참조대상 명확하게 지정
    private User user;

    @Embedded
    private DashboardMetadata metadata;

    //한대시보드가 여러개의 섹션 보유가능
    //Cascade = 부모 저장/삭제시 자식도 자동 저장/삭제
    //orphanRemoval = 부모의 리스트에서 빠진 자식 -> DB 삭제
    //OneToMany는 연관관계 주인 X -> DB에 생기지 않음
    //대시보드 -> 섹션 연결
    @OneToMany(mappedBy = "dashboard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Section> sections; //new로 초기화하면 Jpa가 관리 못함


    //대시보드 -> product 연결
    @OneToMany(mappedBy = "dashboard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

}
