package capstone.offflow.Dashboard.Controller;


import capstone.offflow.Dashboard.Dto.ProductDto;
import capstone.offflow.Dashboard.Repository.ProductRepository;
import capstone.offflow.Dashboard.Service.ProductService;
import capstone.offflow.User.Service.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/products")
@Slf4j
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService;


    //상품 생성
    // Valid + BindingResult => DTO 필드 유효성 검사 (Notblank, notnull, size등)
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(
            @RequestBody @Validated ProductDto productDto,
            BindingResult result,
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){
        if (result.hasErrors()){
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(),
                    error.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try{
            productService.createProduct(productDto, userPrincipal.getUser());
            return new ResponseEntity<>("Product created Successfully", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
