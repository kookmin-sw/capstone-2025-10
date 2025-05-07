package capstone.offflow.Visitor.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Visitor.Domain.Survey;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SurveyDto {

    private Long id;

    private String surveyName;
    private Date registerDate;

    private Long dashboardId;


    // Entity → DTO
    public static SurveyDto convertToDto(Survey survey) {
        return SurveyDto.builder()
                .id(survey.getId())
                .surveyName(survey.getSurveyName())
                .registerDate(survey.getRegisterDate())
                .dashboardId(survey.getDashboard().getId())
                .build();
    }

    // DTO → Entity (등록 시)
    public static Survey convertToEntity(SurveyDto dto, Dashboard dashboard) {
        return Survey.builder()
                .surveyName(dto.getSurveyName())
                .registerDate(dto.getRegisterDate())
                .dashboard(dashboard)
                .build();
    }
}
