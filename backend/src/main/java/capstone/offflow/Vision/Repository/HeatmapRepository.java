package capstone.offflow.Vision.Repository;

import capstone.offflow.Vision.Domain.Heatmap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeatmapRepository extends JpaRepository<Heatmap,Long> {
}
