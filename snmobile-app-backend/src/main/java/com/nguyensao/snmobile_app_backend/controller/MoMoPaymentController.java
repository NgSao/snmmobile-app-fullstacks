package com.nguyensao.snmobile_app_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyensao.snmobile_app_backend.model.PaymentRequest;
import com.nguyensao.snmobile_app_backend.service.MoMoPaymentService;

@RequestMapping("/api/momo")
@RestController
public class MoMoPaymentController {

    @Autowired
    private MoMoPaymentService moMoPaymentService;

    @PostMapping
    public String testPayment(@RequestBody PaymentRequest paymentRequest) {
        String response = moMoPaymentService.createPaymentRequest(paymentRequest.getAmount());
        return response;
    }

    @GetMapping("/order-status/{orderId}")
    public String checkPaymentStatus(@PathVariable String orderId) {
        String response = moMoPaymentService.checkPaymentStatus(orderId);
        return response;
    }

}
