package com.nguyensao.snmobile_app_backend.model;

import lombok.Data;

@Data
public class PaypalRequest {
    private String total;
    private String currency = "USD";
}
