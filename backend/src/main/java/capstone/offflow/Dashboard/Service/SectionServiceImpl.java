package capstone.offflow.Dashboard.Service;


import capstone.offflow.Dashboard.Dto.SectionDto;
import capstone.offflow.Dashboard.Repository.SectionRepository;
import capstone.offflow.User.Domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SectionServiceImpl implements SectionService{

    private final SectionRepository sectionRepository;


    //섹션 생성
    @Override
    public void createSection(SectionDto dto, User user) {

    }

    //섹션 조회
    @Override
    public SectionDto getSectionById(Long id, User user) {
        return null;
    }

    //섹션 삭제
    @Override
    public void deleteSection(Long id, User user) {

    }


}
