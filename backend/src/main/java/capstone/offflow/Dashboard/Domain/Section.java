package capstone.offflow.Dashboard.Domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * 섹션 - 도메인 역할 수행 -> Entity로 만들기
 */

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true) // 좌표 중복방지
    private String position;

    @ManyToOne
    @JoinColumn(name = "dashborad_id") //대시보드 전용 칼럼 생성
    private Dashboard dashboard;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> productList = new ArrayList<>();

}
