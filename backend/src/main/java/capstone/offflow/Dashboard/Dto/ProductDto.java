package capstone.offflow.Dashboard.Dto;

import capstone.offflow.Dashboard.Domain.Dashboard;
import capstone.offflow.Dashboard.Domain.Product;
import lombok.*;



@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductDto {

    @NonNull
    private Long id;
    private String name;
    private int price;

    @NonNull
    private Long dashboardId;
    private String description;
    private String imageUrl;

    //Entity -> DTO (조회용)
    public static ProductDto convertToDto(Product product){
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .build();

    }

    //DTO -> Entity (생성/수정용)
    //static -> 클래스명.메서드명 호출 가능
    //section은 null로 초기화
    public static Product convertToEntity(ProductDto productDto, Dashboard dashboard){
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setImageUrl(productDto.getImageUrl());
        product.setDashboard(dashboard);
        return product;
    }
}
