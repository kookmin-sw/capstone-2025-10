package capstone.offflow.Dashboard.Controller;


import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Dto.SectionDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Service.SectionService;
import capstone.offflow.User.Domain.User;
import capstone.offflow.User.Service.UserPrincipal;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sections")
@Slf4j
public class SectionController {

    private final SectionService sectionService;
    private final DashboardRepository dashboardRepository;

    //섹션생성
    @PostMapping
    public ResponseEntity<?> createSection(
            @RequestBody SectionDto sectionDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        if (sectionDto.getPositionList().isEmpty()) {
            throw new IllegalArgumentException("positionList는 비어 있을 수 없습니다.");
        }

        Section section = sectionService.createSection(sectionDto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(SectionDto.convertToDto(section));
    }


    //섹션조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getSectionById(
            @PathVariable(name="id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        SectionDto dto = sectionService.getSectionById(id, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }


    //섹션수정
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateSection(
            @PathVariable (name = "id") Long id,
            @RequestBody SectionDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        Section updatedSection = sectionService.updateSection(id, dto, userPrincipal.getUser());
        return ResponseEntity.ok(updatedSection);
    }

    //섹션에 매핑된 상품 삭제
    @DeleteMapping("/{sectionId}/products/{productId}")
    public ResponseEntity<?> unmapProductFromSection(
            @PathVariable (name = "sectionId") Long sectionId,
            @PathVariable (name = "productId") Long productId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Section deletedSection = sectionService.unmapProductFromSection(
                sectionId,productId,userPrincipal.getUser());
        return ResponseEntity.ok(deletedSection);
    }


    //섹션삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSection(
            @PathVariable (name = "id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        sectionService.deleteSection(id, userPrincipal.getUser());
        return ResponseEntity.ok("Section delete successfully");
    }
}
