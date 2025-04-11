package capstone.offflow.Vision.Service.Business;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Dto.GenderAgeDto;

import java.util.List;

public interface GenderAgeService {

    List<GenderAgeDto> getGenderAgeById(Long dashboardId, User user);
}
