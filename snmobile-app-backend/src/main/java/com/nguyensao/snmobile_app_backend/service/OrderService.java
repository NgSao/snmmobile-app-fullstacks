package com.nguyensao.snmobile_app_backend.service;

import java.util.List;
import java.util.Optional;

import com.nguyensao.snmobile_app_backend.dto.OrderDTO;
import com.nguyensao.snmobile_app_backend.entity.Order;

public interface OrderService {
    List<Order> getAllOrders();

    Optional<Order> getOrderById(Long id);

    List<Order> getOrdersByUserId(Long userId);

    Order createOrder(OrderDTO orderDTO);

    Order updateOrder(Order order);

    void deleteOrder(Long id);

    Order getOrderByCode(String orderCode);

    Order updateOrderStatus(String orderCode, Integer status);

}
