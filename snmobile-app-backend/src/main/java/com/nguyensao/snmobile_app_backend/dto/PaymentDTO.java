package com.nguyensao.snmobile_app_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentDTO {
    private Long id;
    private Long orderId;
    private String method;
    private String status;
}
