package capstone.offflow.Vision.Service.Business;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Dto.TrackingDto;

import java.util.List;

public interface TrackingService {

    List<TrackingDto> getTrackingById(Long dashboardId, User user);

    void save(TrackingDto dto, Long dashboardId);
}
