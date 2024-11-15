package com.nguyensao.snmobile_app_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class CartDetailDTO {
    private Long id;
    private Long cartId;
    private Long colorId;
    private Integer quantity;
}
