package capstone.offflow.Visitor.Repository;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Visitor.Domain.Survey;
import capstone.offflow.Visitor.Domain.SurveyAnswer;
import capstone.offflow.Visitor.Domain.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyAnswerRepository extends JpaRepository<SurveyAnswer, Long> {
    
    Optional<SurveyAnswer> findByIdAndSurvey(Long surveyAnswerId, Survey survey);

    List<SurveyAnswer> findAllBySurvey_IdAndSurvey_Dashboard_User_UserId(Long surveyId, String userId);

    boolean existsByVisitorAndSurvey(Visitor visitor, Survey survey);
}
