package capstone.offflow.Visitor.Controller;


import capstone.offflow.User.Service.UserPrincipal;
import capstone.offflow.Visitor.Domain.Survey;
import capstone.offflow.Visitor.Domain.SurveyAnswer;
import capstone.offflow.Visitor.Dto.SurveyAnswerDto;
import capstone.offflow.Visitor.Dto.SurveyDto;
import capstone.offflow.Visitor.Service.SurveyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/survey")
public class SurveyController {

    private final SurveyService surveyService;

    //Survey 등록
    @PostMapping
    public ResponseEntity<?> createSurvey(
            @RequestBody @Validated SurveyDto surveyDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Survey survey = surveyService.createSurvey(surveyDto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(SurveyDto.convertToDto(survey));
    }

    //Survey 답변 등록
    @PostMapping("/surveyAnswer")
    public ResponseEntity<?> createSurveyAnswer(
            @RequestBody @Validated SurveyAnswerDto surveyAnswerDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        SurveyAnswer surveyAnswer = surveyService.createSurveyAnswer(surveyAnswerDto, userPrincipal.getUser());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(SurveyAnswerDto.convertToDto(surveyAnswer));

    }


    //Survey 조회 (전체)
    @GetMapping("/{dashboardId}")
    public ResponseEntity<?> getAllSurvey(
            @PathVariable(name= "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        List<SurveyDto> dto = surveyService.getAllSurveyByDashboard(dashboardId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }

    //Survey 답변 전체 조회
    @GetMapping("/{surveyId}/surveyAnswer")
    public ResponseEntity<?> getAllSurveyAnswer(
            @PathVariable(name= "surveyId") Long surveyId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        List<SurveyAnswerDto> dto = surveyService.getAllAnswerBySurvey(surveyId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }



    //Survey 답변 조회 - 방문객 id
    @GetMapping("/{surveyId}/surveyAnswer/{answerId}")
    public ResponseEntity<?> getSurveyAnswer(
            @PathVariable(name= "surveyId") Long surveyId,
            @PathVariable(name= "answerId") Long answerId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        SurveyAnswerDto surveyAnswerDto = surveyService.getSurveyAnswer(surveyId,answerId, userPrincipal.getUser());
        return ResponseEntity.ok(surveyAnswerDto);
    }


    //Survey 삭제
    @DeleteMapping("/{surveyId}")
    public ResponseEntity<?> deleteSurvey(
            @PathVariable(name = "surveyId") Long surveyId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        SurveyDto surveyDto = surveyService.getSurvey(surveyId,userPrincipal.getUser());

        surveyService.deleteSurvey(surveyId, userPrincipal.getUser());
        return ResponseEntity.ok(surveyDto);
    }


}
