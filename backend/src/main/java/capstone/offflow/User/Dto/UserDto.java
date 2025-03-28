package capstone.offflow.User.Dto;


import lombok.*;

import java.util.Date;

@Builder
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor (access = AccessLevel.PROTECTED)
public class UserDto {

    private Long id;
    private String userId;
    private String companyName;
    private String managerName;

    private int messageCount;
    private int surveyCount;

    private boolean privacyAccepted;
    private boolean serviceAccepted;

    private Date registerDate;


}
