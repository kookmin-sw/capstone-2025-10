package capstone.offflow.Vision.Dto;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Vision.Domain.GenderAge;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.time.LocalDateTime;
import java.time.ZoneId;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
public class GenderAgeDto {

    private Long id;

    @NonNull
    private Long dashboardId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime detectedTime; //보낸 시간

    private String visitorLabel; //방문객 구분 라벨

    private String gender; //성별

    private String age; //나이

    //Entity -> Dto
    public static GenderAgeDto convertToDto(GenderAge genderAge){
        return GenderAgeDto.builder()
                .id(genderAge.getId())
                .dashboardId(genderAge.getDashboard().getId())
                .detectedTime(
                    genderAge.getDetectedTime().toInstant()
                             .atZone(ZoneId.systemDefault())
                             .toLocalDateTime()
                )
                .visitorLabel(genderAge.getVisitorLabel())
                .gender(genderAge.getGender())
                .age(genderAge.getAge())
                .build();
    }



    //Dto -> Entity
    public static GenderAge convertToEntity(GenderAgeDto genderAgeDto, Dashboard dashboard){
        GenderAge genderAge = new GenderAge();

        genderAge.setDetectedTime(java.sql.Timestamp.valueOf(genderAgeDto.getDetectedTime())); // ✅ LocalDateTime → Timestamp
        genderAge.setVisitorLabel(genderAgeDto.getVisitorLabel());
        genderAge.setGender(genderAgeDto.getGender());
        genderAge.setAge(genderAgeDto.getAge());
        genderAge.setDashboard(dashboard);

        return genderAge;
    }

}
