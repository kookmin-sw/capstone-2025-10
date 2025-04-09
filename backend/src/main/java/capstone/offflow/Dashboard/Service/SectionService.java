package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Dashboard.Dto.SectionDto;
import capstone.offflow.User.Domain.User;

public interface SectionService {


    //섹션 추가
    Section createSection(SectionDto dto, User user);

    //섹션 수정
    Section updateSection(Long id, SectionDto dto, User user);

    //섹션 조회
    SectionDto getSectionById(Long id,  User user);


    //섹션 삭제
    void deleteSection(Long id, User user);

}
