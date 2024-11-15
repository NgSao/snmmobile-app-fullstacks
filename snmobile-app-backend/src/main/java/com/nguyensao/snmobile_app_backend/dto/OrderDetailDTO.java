package com.nguyensao.snmobile_app_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDetailDTO {
    private Long id;
    private Long orderId;
    private Long colorId;
    private Integer quantity;
    private String price;

}
