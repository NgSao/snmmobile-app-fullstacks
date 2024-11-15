package com.nguyensao.snmobile_app_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ShopDTO {
    private Long id;
    private String name;
    private String address;
    private Long userId;
}
