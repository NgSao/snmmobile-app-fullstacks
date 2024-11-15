package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.dto.OrderDTO;
import com.nguyensao.snmobile_app_backend.entity.Order;
import com.nguyensao.snmobile_app_backend.service.OrderService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // @GetMapping("/{id}")
    // public Order getOrderById(@PathVariable Long id) {
    // return orderService.getOrderById(id).orElseThrow(() -> new
    // RuntimeException("Order not found"));
    // }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO) {
        Order createdOrder = orderService.createOrder(orderDTO);
        return new ResponseEntity<>(createdOrder, HttpStatus.OK);
    }

    @GetMapping("/orderCode/{orderCode}")
    public ResponseEntity<Order> getOrderByCode(@PathVariable String orderCode) {
        Order orders = orderService.getOrderByCode(orderCode);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/orderCode/{orderCode}/status/{status}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String orderCode, @PathVariable Integer status) {
        Order orders = orderService.updateOrderStatus(orderCode, status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // @PostMapping
    // public Order updateOrder(@RequestBody Order updatedOrder) {
    // return orderService.updateOrder(updatedOrder);
    // }

    // @DeleteMapping("/{id}")
    // public void deleteOrder(@PathVariable Long id) {
    // orderService.deleteOrder(id);
    // }
    // Khai báo lỗi
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    // Khai báo đã có
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
