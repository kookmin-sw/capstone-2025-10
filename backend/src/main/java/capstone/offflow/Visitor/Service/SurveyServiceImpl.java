package capstone.offflow.Visitor.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.User.Domain.User;
import capstone.offflow.Visitor.Domain.Survey;
import capstone.offflow.Visitor.Domain.SurveyAnswer;
import capstone.offflow.Visitor.Dto.SurveyAnswerDto;
import capstone.offflow.Visitor.Dto.SurveyDto;
import capstone.offflow.Visitor.Repository.SurveyAnswerRepository;
import capstone.offflow.Visitor.Repository.SurveyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService{

    private final SurveyAnswerRepository surveyAnswerRepository;
    private final SurveyRepository surveyRepository;
    private final DashboardRepository dashboardRepository;

    @Override
    public Survey createSurvey(SurveyDto surveyDto, User user) {
        //1. 대시보드 조회
        Dashboard dashboard = dashboardRepository.findByIdAndUser(surveyDto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        //2. 설문조사 생성
        Survey survey = SurveyDto.convertToEntity(surveyDto, dashboard);
        Survey savedSurvey = surveyRepository.save(survey);

        log.info("Survey 생성 완료 - {}", savedSurvey.getId());
        log.info("Survey 생성 완료 - {}", savedSurvey.getDashboard());

        return savedSurvey;
    }

    @Override
    @Transactional(readOnly = true)
    public SurveyDto getSurvey(Long surveyId, User user) {

        Survey survey = surveyRepository.findByIdAndDashboard_User(surveyId, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 설문조사를 찾을 수 없습니다."));

        return SurveyDto.convertToDto(survey);
    }

    @Override
    @Transactional(readOnly = true)
    public SurveyAnswerDto getSurveyAnswer(Long surveyId, Long surveyAnswerId, User user) {
        //1. Survey 유효성 검증
        Survey survey = surveyRepository.findByIdAndDashboard_User(surveyId, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 설문조사를 찾을 수 없습니다."));

        //2. Survey Answer 유효성 검증
        SurveyAnswer surveyAnswer = surveyAnswerRepository.findByIdAndSurvey(surveyAnswerId,survey)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 설문조사 답변을 찾을 수 없습니다."));

        return SurveyAnswerDto.convertToDto(surveyAnswer);
    }

    //Survey 전체 조회
    @Override
    public List<SurveyDto> getAllSurveyByDashboard(Long dashboardId, User user) {
        List<Survey> surveys = surveyRepository.findAllByDashboardIdAndDashboard_User(dashboardId,user);

        return surveys.stream()
                .map(SurveyDto::convertToDto)
                .collect(Collectors.toList());
    }


    //Survey Answer 전체 조회
    @Override
    @Transactional(readOnly = true)
    public List<SurveyAnswerDto> getAllAnswerBySurvey(Long surveyId, User user) {
        List<SurveyAnswer> surveyAnswers = surveyAnswerRepository.findAllBySurvey_IdAndSurvey_Dashboard_User(surveyId, user);

        return surveyAnswers.stream()
                .map(SurveyAnswerDto::convertToDto)
                .collect(Collectors.toList());
    }


    @Override
    public void deleteSurvey(Long id, User user) {
        //1. 설문조사 유효성 검증
        Survey survey = surveyRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 설문조사를 찾을 수 없습니다."));

        surveyRepository.delete(survey);
        log.info("설문조사 삭제 완료 {}", survey.getId());

    }
}
