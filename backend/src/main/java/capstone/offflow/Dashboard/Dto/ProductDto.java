package capstone.offflow.Dashboard.Dto;

import capstone.offflow.Dashboard.Domain.Product;
import lombok.*;
import org.springframework.security.access.method.P;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductDto {

    private Long id;
    private String name;
    private int price;
    private String description;
    private String imageUrl;

    public static ProductDto convertToDto(Product product){
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .build();

    }
}
