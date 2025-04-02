package capstone.offflow.Dashboard.Dto;

import capstone.offflow.Dashboard.Domain.Section;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SectionDto {
    private Long id;
    private String name;
    private String position;


    //Entity -> Dto
    public static SectionDto convertToDto(Section section) {
        return SectionDto.builder()
                .id(section.getId())
                .name(section.getName())
                .build();
    }

    //Dto -> Entity (생성/수정용)
    public static





}
