package capstone.offflow.Visitor.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Visitor.Domain.Survey;

import lombok.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SurveyDto {

    private Long id;

    private String surveyName;
    private Date registerDate;

    private Long dashboardId;

    private List<SurveyAnswerDto> answerList;



    // Entity → DTO
    public static SurveyDto convertToDto(Survey survey) {
        List<SurveyAnswerDto> answers = Optional.ofNullable(survey.getSurveyAnswers())
                .orElse(Collections.emptyList())
                .stream()
                .map(SurveyAnswerDto::convertToDto)
                .collect(Collectors.toList());

        return SurveyDto.builder()
                .id(survey.getId())
                .surveyName(survey.getSurveyName())
                .registerDate(survey.getRegisterDate())
                .dashboardId(survey.getDashboard().getId())
                .answerList(answers)
                .build();
    }

    // DTO → Entity (등록 시)
    public static Survey convertToEntity(SurveyDto dto, Dashboard dashboard) {
        return Survey.builder()
                .surveyName(dto.getSurveyName())
                .dashboard(dashboard)
                .build();
    }
}
