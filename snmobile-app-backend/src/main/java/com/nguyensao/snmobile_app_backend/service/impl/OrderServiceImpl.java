package com.nguyensao.snmobile_app_backend.service.impl;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
// import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.dto.OrderCustommerDTO;
import com.nguyensao.snmobile_app_backend.dto.OrderDTO;
import com.nguyensao.snmobile_app_backend.dto.OrderDetailDTO;
import com.nguyensao.snmobile_app_backend.dto.PaymentDTO;
import com.nguyensao.snmobile_app_backend.entity.Color;
import com.nguyensao.snmobile_app_backend.entity.Order;
import com.nguyensao.snmobile_app_backend.entity.OrderCustommer;
import com.nguyensao.snmobile_app_backend.entity.OrderDetail;
import com.nguyensao.snmobile_app_backend.entity.Payment;
import com.nguyensao.snmobile_app_backend.entity.Shops;
import com.nguyensao.snmobile_app_backend.entity.User;
import com.nguyensao.snmobile_app_backend.repository.ColorRepository;
import com.nguyensao.snmobile_app_backend.repository.OrderCustommerRepository;
import com.nguyensao.snmobile_app_backend.repository.OrderDetailRepository;
import com.nguyensao.snmobile_app_backend.repository.OrderRepository;
import com.nguyensao.snmobile_app_backend.repository.PaymentRepository;
import com.nguyensao.snmobile_app_backend.repository.ShoppsRepository;
import com.nguyensao.snmobile_app_backend.repository.UserRepository;
import com.nguyensao.snmobile_app_backend.service.OrderService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final OrderCustommerRepository orderCustommerRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ColorRepository colorRepository;
    private final ShoppsRepository shoppsRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Order.desc("id"))); // Sắp xếp theo id tăng dần
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByIdDesc(userId);
    }

    @Override
    public Order createOrder(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId()).orElse(null);
        Order order = new Order();
        order.setUser(user);
        // order.setOrderCode(generateUniqueOrderCode());
        order.setOrderCode(orderDTO.getOrderCode());
        order.setStatus(1);
        order.setTotal(orderDTO.getTotal());
        order.setSupport(orderDTO.getSubpor());
        order.setCreatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);

        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetailDTOs()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(savedOrder);
            Color color = colorRepository.findById(detailDTO.getColorId())
                    .orElseThrow(() -> new IllegalArgumentException("Color ID not found"));

            orderDetail.setColor(color);

            orderDetail.setQuantity(detailDTO.getQuantity());

            int orderedQuantity = detailDTO.getQuantity();
            int newQuantity = color.getQuantity() - orderedQuantity;

            if (newQuantity < 0) {
                throw new IllegalArgumentException("Số lượng không đủ: " + detailDTO.getColorId());
            }
            color.setQuantity(newQuantity);
            colorRepository.save(color);

            orderDetail.setPrice(detailDTO.getPrice());
            orderDetailRepository.save(orderDetail);
        }

        OrderCustommerDTO orderCustommerDTO = orderDTO.getOrderCustommerDTO();
        OrderCustommer orderCustommer = new OrderCustommer();
        orderCustommer.setOrder(savedOrder);
        orderCustommer.setName(orderCustommerDTO.getName());
        orderCustommer.setAddress(orderCustommerDTO.getAddress());
        orderCustommer.setNote(orderCustommerDTO.getNote());
        orderCustommer.setPhone(orderCustommerDTO.getPhone());
        orderCustommer.setEmail(orderCustommerDTO.getEmail());
        orderCustommer.setNameOther(orderCustommerDTO.getNameOther());
        orderCustommer.setPhoneOther(orderCustommerDTO.getPhoneOther());

        Shops shops = shoppsRepository.findById(orderCustommerDTO.getShopId()).orElse(null);
        orderCustommer.setShops(shops);

        orderCustommerRepository.save(orderCustommer);

        PaymentDTO paymentDTO = orderDTO.getPaymentDTO();
        Payment payment = new Payment();
        payment.setOrder(savedOrder);
        payment.setMethod(paymentDTO.getMethod());
        payment.setStatus(paymentDTO.getStatus());
        payment.setTime(LocalTime.now());

        paymentRepository.save(payment);

        return savedOrder;
    }

    // Xử lý frontend
    // private String generateUniqueOrderCode() {
    // return "SN." + UUID.randomUUID().toString().replace("-", "").substring(0,
    // 10).toUpperCase();
    // }

    @Override
    public Order getOrderByCode(String orderCode) {
        return orderRepository.findByOrderCode(orderCode);
    }

    @Override
    public Order updateOrderStatus(String orderCode, Integer status) {
        Order order = orderRepository.findByOrderCode(orderCode);
        if (order != null) {
            order.setStatus(status);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepository.save(order);
        } else {
            return null;
        }
    }

    @Override
    public Order updateOrder(Order updatedOrder) {
        Long id = updatedOrder.getId();
        return orderRepository.findById(id).map(order -> {
            order.setOrderCode(updatedOrder.getOrderCode());
            order.setTotal(updatedOrder.getTotal());
            order.setSupport(updatedOrder.getSupport());
            order.setStatus(updatedOrder.getStatus());
            order.setUpdatedAt(updatedOrder.getUpdatedAt());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

}
