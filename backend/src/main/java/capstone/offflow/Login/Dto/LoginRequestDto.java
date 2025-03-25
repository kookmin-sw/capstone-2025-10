package capstone.offflow.Login.Dto;

import lombok.Data;
import lombok.Getter;

/**
 *로그인 요청시 필요한 값만 담는 DTO
 * 계층 분리 + 보안 + 유지보수성때문에 로그인 전용 DTO 생성
 * User 객체 자체를 받아버리면 원하지 않는 필드까지 노출될 가능성있음
 */

@Data
@Getter
public class LoginRequestDto {
    private String userId;
    private String password;
}
