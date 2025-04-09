package capstone.offflow.Dashboard.Service;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Product;
import capstone.offflow.Dashboard.Domain.Section;
import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Repository.DashboardRepository;
import capstone.offflow.Dashboard.Repository.ProductRepository;
import capstone.offflow.Dashboard.Repository.SectionRepository;
import capstone.offflow.User.Domain.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final DashboardRepository dashboardRepository;
    private final SectionRepository sectionRepository;


    @Override
    public Product createProduct(ProductDto dto, User user) {
        Dashboard dashboard = dashboardRepository.findByIdAndUser(dto.getDashboardId(), user)
                .orElseThrow(() -> new EntityNotFoundException("대시보드를 찾을 수 없습니다."));

        Product product = ProductDto.convertToEntity(dto, dashboard);
        Product savedProduct = productRepository.save(product);

        log.info("Product 생성 완료 - {}", savedProduct.getId());
        log.info("Product 생성 완료 - {}", savedProduct.getDashboard());
        return savedProduct; //product 리턴
    }


    //Product Id 기반 조회
    @Override
    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id, User user) {
        Product product = productRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 상품을 찾을 수 없습니다."));

        return ProductDto.convertToDto(product);
    }

    //Dashboard Id 기반 조회
    @Override
    public List<ProductDto> getProductByDashboard(Long id, User user) {
        List<Product> products = productRepository.findAllByDashboard_User(id, user);

        return products.stream()
                .map(ProductDto::convertToDto)
                .collect(Collectors.toList());
    }

    //Section Id 기반 조회
    @Override
    public List<ProductDto> getProductBySection(Long id, User user) {
        List<Product> products = productRepository.findAllBySection_User(id, user);

        return products.stream()
                .map(ProductDto::convertToDto)
                .collect(Collectors.toList());
    }

    //상품에 섹션Id값 부여
    @Override
    public Product assignSectionToProduct(Long productId, Long sectionId, User user) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("상품을 찾을 수 없습니다."));

        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new EntityNotFoundException("섹션을 찾을 수 없습니다."));


        // 보안: 본인 소속 대시보드, 섹션인지 검증
        if (!product.getDashboard().getUser().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("상품 접근 권한이 없습니다.");
        }

        if (!section.getDashboard().getUser().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("섹션 접근 권한이 없습니다.");
        }

        product.setSection(section);

        return productRepository.save(product); //수정 후 save하기
    }

    //상품 수정
    @Override
    public Product updateProduct(Long id, ProductDto dto, User user) {

        //상품조회
        Product product = productRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 상품을 찾을 수 없습니다."));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());

        return product;
    }

    //상품 삭제
    @Override
    public void deleteProduct(Long id, User user) {
        Product product = productRepository.findByIdAndDashboard_User(id, user)
                .orElseThrow(() -> new EntityNotFoundException("해당 Id의 상품을 찾을 수 없습니다."));

        productRepository.delete(product);
        log.info("Product 삭제완료 {}", product.getId());
    }
}
