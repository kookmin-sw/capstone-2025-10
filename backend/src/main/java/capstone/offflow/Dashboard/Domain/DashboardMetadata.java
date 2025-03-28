package capstone.offflow.Dashboard.Domain;

import jakarta.persistence.Embeddable;

@Embeddable
public class DashboardMetadata {
    private String popupName;
    private String address;
    private String topic;
    private String popupPurpose;
}
