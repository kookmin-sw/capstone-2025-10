package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.User.Domain.User;

import javax.swing.text.html.Option;

public interface ProductService {
    //상품 생성
    void createProduct(ProductDto dto, User user);

    //상품 수정
    void updateProduct(Long id, ProductDto dto, User user);

    //상품 조회 (상품 Id 기준)
    ProductDto getProductById(Long id, User user);


    //상품 삭제
    void deleteProduct(Long id, User user);
}
