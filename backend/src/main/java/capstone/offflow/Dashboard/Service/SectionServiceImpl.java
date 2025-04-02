package capstone.offflow.Dashboard.Service;


import capstone.offflow.Common.GridConfig;
import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Dashboard.Dto.SectionDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Repository.SectionRepository;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.EntityNotFoundException;
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
    private final DashboardRepository dashboardRepository;
    private final GridConfig gridConfig;


    //섹션 생성
    @Override
    public void createSection(SectionDto dto, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(dto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        // 1. 중복 좌표 체크
        if (gridConfig.hasDuplicate(dto.getPositionList())) {
            throw new IllegalArgumentException("중복된 좌표가 포함되어 있습니다.");
        }

        // 2. 유효한 좌표 범위 체크
        if (!gridConfig.areAllPositionsValid(dto.getPositionList())) {
            throw new IllegalArgumentException("좌표 범위를 벗어난 값이 포함되어 있습니다.");
        }

        Section section = SectionDto.convertToEntity(dto, dashboard);
        sectionRepository.save(section);
        log.info("Product 생성 완료 - {}", section.getId());
    }

    //섹션 수정
    @Override
    public void updateSection(Long id, SectionDto dto, User user) {

        // 대시보드는 조회할 필요 없음 -> findById method 로 이미 유저, 대시보드 권한 검증
        // 1. 섹션 조회 (해당 유저의 섹션인지 확인)
        Section section = sectionRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 섹션을 찾을 수 없습니다."));

        // 2. 중복 좌표 체크
        if (gridConfig.hasDuplicate(dto.getPositionList())) {
            throw new IllegalArgumentException("중복된 좌표가 포함되어 있습니다.");
        }

        // 3. 유효한 좌표 범위 체크
        if (!gridConfig.areAllPositionsValid(dto.getPositionList())) {
            throw new IllegalArgumentException("좌표 범위를 벗어난 값이 포함되어 있습니다.");
        }

        // 4. 필드만 setter로 수정
        section.setName(dto.getName());
        section.setPositionList(dto.getPositionList());

    }

    //섹션 조회
    @Override
    @Transactional(readOnly = true)
    public SectionDto getSectionById(Long id, User user) {

        Section section = sectionRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 섹션을 찾을 수 없습니다."));

        return SectionDto.convertToDto(section); //controller로 DTO를 보내야함
    }

    //섹션 삭제
    @Override
    public void deleteSection(Long id, User user) {
        Section section = sectionRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 섹션을 찾을 수 없습니다."));

        sectionRepository.delete(section);
        log.info("section 삭제완료 {}", section.getId());
    }
}
