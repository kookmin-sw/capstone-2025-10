package capstone.offflow.Visitor.Controller;


import capstone.offflow.User.Service.UserPrincipal;
import capstone.offflow.Visitor.Domain.Visitor;
import capstone.offflow.Visitor.Dto.VisitorDto;
import capstone.offflow.Visitor.Service.VisitorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 방문객은 대시보드를 통해 어떤 유저의 소속인지 Check 가능
 * -> User 인증 세션, 토큰 인증 필요없음
 */

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/visitors")
public class VisitorController {

    private final VisitorService visitorService;


    //방문객 등록
    //별도 예외처리 필요없음 -> 예외 핸들러가 예외발생시 중간 개입후 처리
    @PostMapping
    public ResponseEntity<?> createVisitor(
            @RequestBody @Validated VisitorDto visitorDto){
        try {
            Visitor visitor = visitorService.createVisitor(visitorDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(VisitorDto.convertToDto(visitor));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", e.getMessage()));
        }
    }


    //방문객 수정
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateVisitor(
            @PathVariable(name="id") Long id,
            @RequestBody VisitorDto visitorDto){

        visitorService.updateVisitor(id, visitorDto);
        return ResponseEntity.ok("Visitor updated successfully");
    }


    //방문객 조회 (전체)
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAllVisitor(
            @PathVariable(name= "userId") Long id){

        List<VisitorDto> dto = visitorService.getVisitorByUserId(id);
        return ResponseEntity.ok(dto);
    }


    //방문객 개별조회
    @GetMapping("/{visitorId}")
    public ResponseEntity<?> getVisitor(
            @PathVariable(name= "visitorId") Long visitorId){
        VisitorDto dto = visitorService.getVisitorById(visitorId);
        return ResponseEntity.ok(dto);
    }



    //방문객 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVisitor(
            @PathVariable(name = "id") Long id){

        visitorService.deleteVisitor(id);
        return ResponseEntity.ok("Visitor delete Successfully");
    }


}
