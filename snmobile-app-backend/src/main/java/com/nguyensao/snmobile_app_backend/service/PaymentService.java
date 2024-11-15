package com.nguyensao.snmobile_app_backend.service;

import com.nguyensao.snmobile_app_backend.entity.Payment;

public interface PaymentService {
    Payment getByOrderCode(String OrderCode);
}
