package capstone.offflow.Vision.Service.Business;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Dto.TrackingDto;
import capstone.offflow.Vision.Repository.TrackingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TrackingServiceImpl implements TrackingService{

    private final TrackingRepository trackingRepository;

    @Override
    public List<TrackingDto> getTrackingById(Long dashboardId, User user) {
        return trackingRepository.findAllByDashboard_User(dashboardId, user).stream()
                .map(TrackingDto::convertToDto)
                .toList();
    }
}
