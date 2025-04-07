package capstone.offflow.Dashboard.Controller;


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



@RestController
@RequiredArgsConstructor
@RequestMapping("api/products")
@Slf4j
public class ProductController {

    private final ProductService productService;


    //상품 생성
    //별도 예외처리 필요없음 -> 예외 핸들러가 예외발생시 중간 개입후 처리
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(
            @RequestBody @Validated ProductDto productDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        productService.createProduct(productDto, userPrincipal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body("Product created Successfully");
    }

    //상품 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(
            @PathVariable(name = "id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        ProductDto dto = productService.getProductById(id, userPrincipal.getUser());
        return ResponseEntity.ok(dto);

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
