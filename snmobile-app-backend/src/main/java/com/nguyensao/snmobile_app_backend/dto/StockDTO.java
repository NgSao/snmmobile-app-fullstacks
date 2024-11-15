package com.nguyensao.snmobile_app_backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class StockDTO {
    private Long id;
    private Long productId;
    private String size;
    private String price;
    private List<ColorDTO> colors;

}
