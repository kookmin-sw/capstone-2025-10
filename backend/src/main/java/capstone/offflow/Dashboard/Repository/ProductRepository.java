package capstone.offflow.Dashboard.Repository;

import capstone.offflow.Dashboard.Domain.Product;
import capstone.offflow.User.Domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * JPA 레포지토리 기본 원칙 -> Lazy 지연로딩
 * @EntityGraph 활용해 Fetch join 진행
 */

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // 유저 인증 포함된 상품 조회 (대시보드 정보 포함)
    @Query("SELECT p FROM Product p JOIN FETCH p.dashboard d WHERE p.id = :productId AND d.user = :user")
    Optional<Product> findByIdAndDashboard_User(@Param("productId") Long productId, @Param("user") User user);

    // 대시보드 기준 모든 상품 가져오기
    @Query("SELECT p FROM Product p JOIN FETCH p.dashboard d WHERE d.id = :dashboardId AND d.user = :user")
    List<Product> findAllByDashboard_User(@Param("dashboardId") Long dashboardId, @Param("user") User user);


    // 섹션 기준 모든 상품 가져오기
    @Query("SELECT p FROM Product p JOIN FETCH p.section s WHERE s.id = :sectionId AND s.dashboard.user = :user")
    List<Product> findAllBySection_User(@Param("sectionId") Long sectionId, @Param("user") User user);


    // 섹션 매핑안된 모든 상품 가져오기
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.section s WHERE p.dashboard.user = :user AND (s IS NULL OR s.id != :sectionId)")
    List<Product> findProductsByUserNotInSection(@Param("sectionId") Long sectionId, @Param("user") User user);

}
