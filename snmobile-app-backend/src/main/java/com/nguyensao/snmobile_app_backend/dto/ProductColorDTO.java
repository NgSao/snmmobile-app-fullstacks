package com.nguyensao.snmobile_app_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductColorDTO {

    public ProductColorDTO() {
    }

    private String color;
    private Integer quantity;
    private String imageUrl;
}
