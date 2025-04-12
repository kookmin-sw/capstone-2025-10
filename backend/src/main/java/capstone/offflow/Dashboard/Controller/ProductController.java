package capstone.offflow.Dashboard.Controller;


import capstone.offflow.Dashboard.Domain.Product;
import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Service.ProductService;
import capstone.offflow.User.Service.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/products")
@Slf4j
public class ProductController {

    private final ProductService productService;


    //상품 생성
    //별도 예외처리 필요없음 -> 예외 핸들러가 예외발생시 중간 개입후 처리
    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestBody @Validated ProductDto productDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Product product = productService.createProduct(productDto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ProductDto.convertToDto(product));
    }

    //상품 조회 (product Id)
    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(
            @PathVariable(name = "productId") Long productId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        ProductDto dto = productService.getProductById(productId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }

    //상품 조회 (Dashboard Id) - 전체
    @GetMapping("/dashboard/{dashboardId}")
    public ResponseEntity<?> getProductByDashboard(
            @PathVariable(name = "dashboardId") Long dashboardId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<ProductDto> dto = productService.getProductByDashboard(dashboardId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }


    //상품 조회 (Section Id) -> 선택된
    @GetMapping("/section/{sectionId}")
    public ResponseEntity<?> getProductBySection(
            @PathVariable(name = "sectionId") Long sectionId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<ProductDto> dto = productService.getProductBySection(sectionId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }

    //section에 선택 안된 상품 조회
    @GetMapping("/section/not/{sectionId}")
    public ResponseEntity<?> getProductByNotSection(
            @PathVariable(name = "sectionId") Long sectionId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        List<ProductDto> dto = productService.getProductByNotSection(sectionId, userPrincipal.getUser());
        return ResponseEntity.ok(dto);
    }


    //상품 수정 (상품 - 섹션 매칭)
    @PatchMapping("/{productId}/assign-section/{sectionId}")
    public ResponseEntity<?> assginSectionToProduct(
            @PathVariable(name = "productId") Long productId,
            @PathVariable(name = "sectionId") Long sectionId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        Product product = productService.assignSectionToProduct(productId,sectionId, userPrincipal.getUser());
        return ResponseEntity.ok(ProductDto.convertToDto(product)); //객체 자체 내보내기 X
    }



    //상품 수정
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable(name = "id") Long id,
            @RequestBody ProductDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        productService.updateProduct(id, dto, userPrincipal.getUser());
        return ResponseEntity.ok("Product updated successfully");
    }



    //상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable(name = "id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        productService.deleteProduct(id, userPrincipal.getUser());
        return ResponseEntity.ok("Product delete Successfully");
    }

}
