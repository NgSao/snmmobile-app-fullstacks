package com.nguyensao.snmobile_app_backend.dto;

import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartDTO {
    private Long id;
    private Long userId;
    private LocalTime createdAt;
    private LocalTime updatedAt;
    private List<CartDetailDTO> cartDetailDTO;
}
