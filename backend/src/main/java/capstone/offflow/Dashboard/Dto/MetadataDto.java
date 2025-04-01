package capstone.offflow.Dashboard.Dto;


import capstone.offflow.Dashboard.Domain.DashboardMetadata;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //외부에서 new 못하게 제한
@AllArgsConstructor
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

    public static DashboardMetadata convertToEntity(MetadataDto dto) {
        if (dto == null) return null;
        return new DashboardMetadata(
                dto.getPopupName(),
                dto.getAddress(),
                dto.getTopic(),
                dto.getPopupPurpose()
        );
    }
}