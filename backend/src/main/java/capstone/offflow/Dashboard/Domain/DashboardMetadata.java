package capstone.offflow.Dashboard.Domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DashboardMetadata {
    private String popupName;
    private String address;
    private String topic;
    private String popupPurpose;
}
