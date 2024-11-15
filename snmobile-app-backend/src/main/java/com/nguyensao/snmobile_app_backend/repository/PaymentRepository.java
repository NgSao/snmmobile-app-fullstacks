package com.nguyensao.snmobile_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nguyensao.snmobile_app_backend.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT p FROM Payment p WHERE p.order.orderCode = :orderCode")
    Payment findByOrderCode(@Param("orderCode") String orderCode);
}
