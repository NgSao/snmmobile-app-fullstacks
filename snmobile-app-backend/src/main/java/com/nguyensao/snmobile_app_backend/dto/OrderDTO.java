package com.nguyensao.snmobile_app_backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private String orderCode;
    private Long userId;
    private String total;
    private String subpor;
    private List<OrderDetailDTO> orderDetailDTOs;
    private OrderCustommerDTO orderCustommerDTO;
    private PaymentDTO paymentDTO;

}
