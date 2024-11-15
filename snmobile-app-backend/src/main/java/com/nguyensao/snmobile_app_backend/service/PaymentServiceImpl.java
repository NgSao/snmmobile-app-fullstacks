package com.nguyensao.snmobile_app_backend.service;

import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.entity.Payment;
import com.nguyensao.snmobile_app_backend.repository.PaymentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    @Override
    public Payment getByOrderCode(String OrderCode) {
        return paymentRepository.findByOrderCode(OrderCode);
    }
}
