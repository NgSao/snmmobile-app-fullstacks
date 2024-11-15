package com.nguyensao.snmobile_app_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyensao.snmobile_app_backend.entity.Payment;
import com.nguyensao.snmobile_app_backend.service.PaymentService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private PaymentService paymentService;

    @GetMapping("/{OrderCode}")
    public ResponseEntity<Payment> getByOrderCode(@PathVariable String OrderCode) {
        Payment payment = paymentService.getByOrderCode(OrderCode);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

}
