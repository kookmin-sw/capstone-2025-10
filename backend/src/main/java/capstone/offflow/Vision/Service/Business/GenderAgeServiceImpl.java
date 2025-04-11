package capstone.offflow.Vision.Service.Business;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Vision.Dto.GenderAgeDto;
import capstone.offflow.Vision.Dto.TrackingDto;
import capstone.offflow.Vision.Repository.GenderAgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GenderAgeServiceImpl implements GenderAgeService{

    private final GenderAgeRepository genderAgeRepository;

    @Override
    public List<GenderAgeDto> getGenderAgeById(Long dashboardId, User user){
        return genderAgeRepository.findAllByDashboard_User(dashboardId, user).stream()
                .map(GenderAgeDto::convertToDto)
                .toList();
    }
}
