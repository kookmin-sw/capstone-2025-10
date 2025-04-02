package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Dto.SectionDto;
import capstone.offflow.User.Domain.User;

public interface SectionService {

    void createSection(SectionDto dto, User user);

    SectionDto getSectionById(Long id,  User user);

    void deleteSection(Long id, User user);

}
