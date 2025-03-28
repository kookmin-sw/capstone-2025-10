package capstone.offflow.Dashboard.Dto;


import capstone.offflow.Dashboard.Domain.DashboardMetadata;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MetadataDto {

    private String popupName;
    private String address;
    private String topic;
    private String popupPurpose;

    public static MetadataDto convertToDto(DashboardMetadata metadata){
        return MetadataDto.builder()
                .popupName(metadata.getPopupName())
                .address(metadata.getAddress())
                .topic(metadata.getTopic())
                .popupPurpose(metadata.getPopupPurpose())
                .build();
    }
}