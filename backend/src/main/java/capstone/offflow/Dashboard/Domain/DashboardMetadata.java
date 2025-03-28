package capstone.offflow.Dashboard.Domain;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class DashboardMetadata {
    private String popupName;
    private String address;
    private String topic;
    private String popupPurpose;
}
