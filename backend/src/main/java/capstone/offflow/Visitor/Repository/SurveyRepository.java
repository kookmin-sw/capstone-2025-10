package capstone.offflow.Visitor.Repository;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Visitor.Domain.Survey;
import capstone.offflow.Visitor.Domain.VisitHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {


    Optional<Survey> findByIdAndDashboard_User(Long surveyId, User user);

    List<Survey> findAllByDashboardIdAndDashboard_User(Long dashboardId, User user);
}
