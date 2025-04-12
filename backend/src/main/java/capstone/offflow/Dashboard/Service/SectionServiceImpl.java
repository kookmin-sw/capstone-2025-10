package capstone.offflow.Dashboard.Service;


import capstone.offflow.Common.GridConfig;
import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Product;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Dashboard.Dto.SectionDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Repository.ProductRepository;
import capstone.offflow.Dashboard.Repository.SectionRepository;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SectionServiceImpl implements SectionService{

    private final SectionRepository sectionRepository;
    private final DashboardRepository dashboardRepository;
    private final ProductRepository productRepository;
    private final GridConfig gridConfig;


    //섹션 생성
    @Override
    @Transactional
    public Section createSection(SectionDto dto, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(dto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        log.info("요청 positionList: {}", dto.getPositionList());

        // 1. 요청 내부 중복 체크
        if (gridConfig.hasDuplicate(dto.getPositionList())) {
            throw new IllegalArgumentException("중복된 좌표가 포함되어 있습니다.");
        }

        // 2. 유효한 좌표 범위 체크
        if (!gridConfig.areAllPositionsValid(dto.getPositionList())) {
            throw new IllegalArgumentException("좌표 범위를 벗어난 값이 포함되어 있습니다.");
        }

        // 3. 대시보드 내 다른 섹션들과 좌표 충돌 체크 (GridConfig 위임)
        List<Section> sections = sectionRepository.findByDashboard(dashboard);
        if (gridConfig.hasConflictWithExistingSections(dto.getPositionList(), sections)) {
            throw new IllegalArgumentException("이미 사용 중인 좌표가 포함되어 있습니다.");
        }

        // 4. 저장
        Section section = SectionDto.convertToEntity(dto, dashboard);
        Section savedSection = sectionRepository.save(section);

        log.info("Section 생성 완료 - {}", savedSection.getId());
        return savedSection;
    }


    //섹션 수정
    @Override
    public Section updateSection(Long id, SectionDto dto, User user) {
        // 대시보드는 조회할 필요 없음 -> findById method 로 이미 유저, 대시보드 권한 검증
        // 1. 섹션 조회
        Section section = sectionRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 섹션을 찾을 수 없습니다."));

        // 2. 이름 수정 (이름 수정 요청올때)
        if (dto.getName() != null && !dto.getName().isEmpty()) {
            section.setName(dto.getName());
        }

        // 3. 포지션 리스트 수정 (포지션 수정 요청올때)
        if (dto.getPositionList() != null && !dto.getPositionList().isEmpty()) {

            // 1. 대시보드 내 다른 섹션들 조회
            Dashboard dashboard = section.getDashboard();
            List<Section> sections = sectionRepository.findByDashboard(dashboard);

            // 2. 포지션 충돌 체크 (본인 제외하고)
            if (gridConfig.hasConflictWithExistingSections(dto.getPositionList(), sections)) {
                throw new IllegalArgumentException("이미 사용 중인 좌표가 포함되어 있습니다.");
            }

            // 3. 중복 체크
            if (gridConfig.hasDuplicate(dto.getPositionList())) {
                throw new IllegalArgumentException("요청된 포지션 리스트에 중복된 좌표가 포함되어 있습니다.");
            }

            // 4. 범위 체크
            if (!gridConfig.areAllPositionsValid(dto.getPositionList())) {
                throw new IllegalArgumentException("좌표 범위를 벗어난 값이 포함되어 있습니다.");
            }

            section.setPositionList(dto.getPositionList());
        }

        return sectionRepository.save(section);
    }

    //섹션 조회
    @Override
    @Transactional(readOnly = true)
    public SectionDto getSectionById(Long id, User user) {

        Section section = sectionRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 섹션을 찾을 수 없습니다."));

        return SectionDto.convertToDto(section); //controller로 DTO를 보내야함
    }

    //섹션에 매핑된 상품삭제
    @Override
    public Section unmapProductFromSection(Long sectionId, Long productId, User user) {
        Section section = sectionRepository.findByIdAndDashboard_User(sectionId, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 섹션을 찾을 수 없습니다."));

        Product product = productRepository.findByIdAndDashboard_User(productId, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 섹션을 찾을 수 없습니다."));

        section.getProductList().remove(product);

        return section;
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
