package capstone.offflow.Dashboard.Repository;

import capstone.offflow.Dashboard.Domain.Product;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * JPA 레포지토리 기본 원칙 -> Lazy 지연로딩
 * @EntityGraph 활용해 Fetch join 진행
 */

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    //유저 인증 포함된 상품 조회 (대시보드 정보 포함)
    @EntityGraph(attributePaths = {"dashboard"})
    Optional<Product> findByIdAndDashboard_User(Long productId, User user);
}
