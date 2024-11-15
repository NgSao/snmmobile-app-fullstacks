package com.nguyensao.snmobile_app_backend.dto;

import lombok.Data;

@Data
public class ColorDTO {
    private Long productId;
    private String color;
    private Integer quantity;
    private ImageDTO image;
}
