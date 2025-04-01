package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Repository.ProductRepository;
import capstone.offflow.User.Domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    @Override
    public void createProduct(ProductDto dto, User user) {

    }

    @Override
    public void updateProduct(ProductDto dto, User user) {

    }

    @Override
    public ProductDto getProduct(Long id, User user) {
        return null;
    }

    @Override
    public void deleteProduct(Long id, User user) {

    }
}
