package capstone.offflow.Dashboard.Controller;


import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Repository.ProductRepository;
import capstone.offflow.User.Service.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/products")
@Slf4j
public class ProductController {

    private final ProductRepository productRepository;


    //상품 생성
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(
            @RequestBody @Validated ProductDto productDto,
            BindingResult result,
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){

        return null;
    }


    //상품 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(){
        return null;
    }


    //상품 수정
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProduct(){
        return null;
    }



    //상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(){
        return null;
    }

}
