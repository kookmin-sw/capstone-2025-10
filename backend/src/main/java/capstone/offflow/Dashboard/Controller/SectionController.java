package capstone.offflow.Dashboard.Controller;



import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Dashboard.Dto.SectionDto;
import capstone.offflow.Dashboard.Service.SectionService;
import capstone.offflow.User.Service.UserPrincipal;
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

    //섹션생성
    @PostMapping("/create")
    public ResponseEntity<?> createSection(
            @RequestBody SectionDto sectionDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        sectionService.createSection(sectionDto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body("Section create Successfully");
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


    //섹션삭제
}
