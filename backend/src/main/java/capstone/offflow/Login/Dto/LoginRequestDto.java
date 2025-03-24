package capstone.offflow.Login.Dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class LoginRequestDto {
    private String userId;
    private String password;
}
