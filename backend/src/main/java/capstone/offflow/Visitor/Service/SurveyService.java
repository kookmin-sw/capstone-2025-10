package capstone.offflow.Visitor.Service;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Visitor.Domain.Survey;
import capstone.offflow.Visitor.Dto.SurveyAnswerDto;
import capstone.offflow.Visitor.Dto.SurveyDto;

import java.util.List;

public interface SurveyService {

    Survey createSurvey(SurveyDto surveyDto, User user);

    SurveyDto getSurvey(Long surveyId, User user);

    SurveyAnswerDto getSurveyAnswer(Long surveyId, Long surveyAnswerId, User user);

    List<SurveyDto> getAllSurveyByDashboard(Long dashboardId, User user);

    List<SurveyAnswerDto> getAllAnswerBySurvey(Long surveyId, User user);

    void deleteSurvey(Long id, User user);

}
