package com.nguyensao.snmobile_app_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDetailRequest {
    private Long id;
    private Long orderId;
    private String imageUrl;
    private String productName;
    private Integer quantity;
    private String price;

}
