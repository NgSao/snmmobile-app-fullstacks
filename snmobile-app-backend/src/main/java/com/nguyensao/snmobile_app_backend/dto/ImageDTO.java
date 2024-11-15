package com.nguyensao.snmobile_app_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class ImageDTO {
    private Long productId;
    private String imageUrl;
    private Long colorId;
}
