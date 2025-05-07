package capstone.offflow.Visitor.Dto;


import capstone.offflow.Visitor.Domain.Survey;
import capstone.offflow.Visitor.Domain.SurveyAnswer;
import capstone.offflow.Visitor.Domain.Visitor;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SurveyAnswerDto {


    private Long id;

    private String ageQuestion; // 1번
    private String genderQuestion; // 2번

    private String knowRoute; // 3번
    private String bestThing; //4번
    private String worstThing; //5번
    private String additionalThing; //6번
    private Date registerDate;

    private Long visitorId;
    private Long surveyId;

    //Entity -> DTO
    public static SurveyAnswerDto convertToDto(SurveyAnswer surveyAnswer){
        return SurveyAnswerDto.builder()
                .id(surveyAnswer.getId())
                .ageQuestion(surveyAnswer.getAgeQuestion())
                .genderQuestion(surveyAnswer.getGenderQuestion())
                .knowRoute(surveyAnswer.getKnowRoute())
                .bestThing(surveyAnswer.getBestThing())
                .worstThing(surveyAnswer.getWorstThing())
                .additionalThing(surveyAnswer.getAdditionalThing())
                .registerDate(surveyAnswer.getRegisterDate())
                .visitorId(surveyAnswer.getVisitor().getId())
                .surveyId(surveyAnswer.getSurvey().getId())
                .build();
    }

    //DTO -> Entity
    public static SurveyAnswer convertToEntity(SurveyAnswerDto dto, Visitor visitor, Survey survey){
        return SurveyAnswer.builder()
                .ageQuestion(dto.getAgeQuestion())
                .genderQuestion(dto.getGenderQuestion())
                .knowRoute(dto.getKnowRoute())
                .bestThing(dto.getBestThing())
                .worstThing(dto.getWorstThing())
                .additionalThing(dto.getAdditionalThing())
                .visitor(visitor)
                .survey(survey)
                .build();
    }

}
