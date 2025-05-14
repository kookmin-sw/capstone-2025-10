package capstone.offflow.Dashboard.Domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private int price;
    private String description;
    private String imageUrl;

    @ManyToOne(optional = false) //항상 대시보드에 소속
    @JoinColumn(name = "dashboard_id")
    @JsonIgnore
    private Dashboard dashboard;

    @ManyToOne //default => 섹션은 나중에 배치될 수 있음
    @JoinColumn(name = "section_id")
    @JsonIgnore
    private Section section;
}
