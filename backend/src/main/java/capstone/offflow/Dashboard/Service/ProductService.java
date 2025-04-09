package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Domain.Product;
import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.User.Domain.User;


public interface ProductService {
    //상품 생성
    Product createProduct(ProductDto dto, User user);

    //상품 수정
    void updateProduct(Long id, ProductDto dto, User user);

    //상품 조회 (Product Id 기준)
    ProductDto getProductById(Long id, User user);

    //상품 조회 (Dashboard Id 기준)
    ProductDto getProductByDashboard(Long id, User user);

    //상품 조회 (Section Id 기준)
    ProductDto getProductBySection(Long id, User user);

    //상품 - 섹션 연결
    void assignSectionToProduct(Long productId, Long sectionId, User user);


    //상품 삭제
    void deleteProduct(Long id, User user);
}
