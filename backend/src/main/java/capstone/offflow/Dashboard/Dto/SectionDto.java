package capstone.offflow.Dashboard.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Section;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SectionDto {
    @NonNull
    private Long id;

    private String name;

    @NonNull
    private List<String> positionList;

    @NonNull
    private Long dashboardId;


    //Entity -> Dto
    public static SectionDto convertToDto(Section section) {
        return SectionDto.builder()
                .id(section.getId())
                .name(section.getName())
                .positionList(section.getPositionList())
                .dashboardId(section.getDashboard().getId())
                .build();
    }

    //Dto -> Entity (생성/수정용)
    public static Section convertToEntity(SectionDto sectionDto, Dashboard dashboard){
        Section section = new Section();
        section.setName(sectionDto.getName());
        section.setPositionList(sectionDto.getPositionList());
        section.setDashboard(dashboard);
        section.setProductList(new ArrayList<>());  //빈 상품리스트로 만들기
        return section;
    }
}
