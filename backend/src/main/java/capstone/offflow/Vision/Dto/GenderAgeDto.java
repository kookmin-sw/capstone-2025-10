package capstone.offflow.Vision.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.GenderAge;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class GenderAgeDto {

    @NonNull
    private Long id;

    @NonNull
    private Long dashboardId;

    private Date detectedTime; //보낸 시간

    private String visitorLabel; //방문객 구분 라벨

    private String gender; //성별

    private String age; //나이

    //Entity -> Dto
    public static GenderAgeDto convertToDto(GenderAge genderAge){
        return GenderAgeDto.builder()
                .id(genderAge.getId())
                .detectedTime(genderAge.getDetectedTime())
                .visitorLabel(genderAge.getVisitorLabel())
                .gender(genderAge.getGender())
                .age(genderAge.getAge())
                .build();
    }



    //Dto -> Entity
    public static GenderAge convertToEntity(GenderAgeDto genderAgeDto, Dashboard dashboard){
        GenderAge genderAge = new GenderAge();

        genderAge.setDetectedTime(genderAgeDto.getDetectedTime());
        genderAge.setVisitorLabel(genderAgeDto.getVisitorLabel());
        genderAge.setGender(genderAge.getGender());
        genderAge.setAge(genderAge.getAge());
        genderAge.setDashboard(dashboard);
        return genderAge;
    }

}
