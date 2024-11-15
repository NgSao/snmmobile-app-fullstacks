package com.nguyensao.snmobile_app_backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductStockDTO {
    public ProductStockDTO() {
    }

    private Long id;
    private String name;
    private Long categoryId;
    private Long brandId;
    private Long colorId;
    private Long stockId;
    private Integer discount;
    private String status;
    private Integer rating;
    private String size;
    private String price;
    private List<ProductColorDTO> colors;
}
