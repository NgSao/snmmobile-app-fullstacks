package com.nguyensao.snmobile_app_backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private Long categoryId;
    private Long brandId;
    private Integer discount;
    private String status;
    private Integer rating;
    private List<ImageDTO> images;
}
