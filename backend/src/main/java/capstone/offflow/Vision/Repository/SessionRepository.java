package capstone.offflow.Vision.Repository;

import capstone.offflow.Vision.Domain.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
}
