package capstone.offflow.Visitor.Service;

import capstone.offflow.User.Domain.User;
import capstone.offflow.Visitor.Domain.Visitor;
import capstone.offflow.Visitor.Dto.VisitorDto;

import java.util.List;

public interface VisitorService {

    //방문객 등록
    Visitor createVisitor(VisitorDto visitorDto);

    //방문객 전체 조회
    List<VisitorDto> getVisitorByUserId(Long id);

    //방문객 조회
    VisitorDto getVisitorById(Long visitorId);

    //방문객 수정
    void updateVisitor(Long id, VisitorDto visitorDto);

    //방문객 삭제
    void deleteVisitor(Long id);

}
