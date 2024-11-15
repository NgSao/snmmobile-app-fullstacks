package com.nguyensao.snmobile_app_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderCustommerDTO {
    private Long id;
    private Long orderId;
    private Long shopId;
    private String name;
    private String address;
    private String email;
    private String note;
    private String phone;
    private String nameOther;
    private String phoneOther;
}
