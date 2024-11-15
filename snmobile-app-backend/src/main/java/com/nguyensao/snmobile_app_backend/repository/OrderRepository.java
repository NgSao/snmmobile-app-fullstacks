package com.nguyensao.snmobile_app_backend.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyensao.snmobile_app_backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findByUserIdOrderByIdDesc(Long userId);

    Order findByOrderCode(String orderCode);

    List<Order> findAll(Sort sort);

    // Order findByOrderCodeAndStatus(String orderCode, Integer status);
}
