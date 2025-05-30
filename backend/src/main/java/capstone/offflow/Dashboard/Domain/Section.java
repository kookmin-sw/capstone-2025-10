package capstone.offflow.Dashboard.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ElementCollection
    @Column(name = "position", unique = true)
    private List<String> positionList;

    @ManyToOne
    @JoinColumn(name = "dashboard_id") //대시보드 전용 칼럼 생성
    @JsonIgnore
    private Dashboard dashboard;

    //new로 생성시 JPA에서 관리 불가능
    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> productList;

}
