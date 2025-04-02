package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Product;
import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Repository.ProductRepository;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.EntityNotFoundException;
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
    private final DashboardRepository dashboardRepository;

    @Override
    public void createProduct(ProductDto dto, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(dto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        Product product = ProductDto.convertToEntity(dto, dashboard);
        productRepository.save(product);
        log.info("Product 생성 완료 - {}", product.getId());
    }

    @Override
    public void updateProduct(ProductDto dto, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(dto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));
        Product product = ProductDto.convertToEntity(dto, dashboard);

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());

    }

    @Override
    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id, User user) {
        Product product = productRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 상품을 찾을 수 없습니다."));

        return ProductDto.convertToDto(product);
    }

    @Override
    public void deleteProduct(Long id, User user) {
        Product product = productRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 상품을 찾을 수 없습니다."));

        productRepository.delete(product);
        log.info("Product 삭제완료 {}", product.getId());
    }
}
