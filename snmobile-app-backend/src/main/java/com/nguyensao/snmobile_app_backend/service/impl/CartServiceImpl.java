package com.nguyensao.snmobile_app_backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.dto.CartDetailDTO;
import com.nguyensao.snmobile_app_backend.entity.Cart;
import com.nguyensao.snmobile_app_backend.entity.CartDetail;
import com.nguyensao.snmobile_app_backend.entity.Color;
import com.nguyensao.snmobile_app_backend.repository.CartDetailRepository;
import com.nguyensao.snmobile_app_backend.repository.CartRepository;
import com.nguyensao.snmobile_app_backend.repository.ColorRepository;
import com.nguyensao.snmobile_app_backend.service.CartService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;
    private final ColorRepository colorRepository;

    @Override
    public List<Cart> getCartAll() {
        return cartRepository.findAll();
    }

    // @Override
    // public List<CartDetail> getCartDetailByUserId(Long userId) {
    // return cartDetailRepository.findByCartUserId(userId);
    // }

    @Override
    public List<CartDetail> getCartDetailsByCartId(Long cartId) {
        return cartDetailRepository.findByCart_Id(cartId);
    }

    @Override
    public CartDetail createCartDetail(CartDetailDTO cartDetailDTO) {
        Cart cart = cartRepository.findById(cartDetailDTO.getCartId())
                .orElseThrow(() -> new EntityNotFoundException("Lỗi"));

        Color color = colorRepository.findById(cartDetailDTO.getColorId())
                .orElseThrow(() -> new EntityNotFoundException("Lỗi"));

        Optional<CartDetail> existingCartDetail = cartDetailRepository.findByCartAndColor(cart, color);

        if (existingCartDetail.isPresent()) {
            CartDetail cartDetail = existingCartDetail.get();
            Integer newQuantity = cartDetail.getQuantity() + cartDetailDTO.getQuantity();
            if (newQuantity > color.getQuantity()) {
                throw new IllegalArgumentException("Số lượng lượng mua lớn hơn số lượng kho");
            }
            cartDetail.setQuantity(newQuantity);
            return cartDetailRepository.save(cartDetail);
        } else {
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setColor(color);
            cartDetail.setQuantity(cartDetailDTO.getQuantity());
            return cartDetailRepository.save(cartDetail);
        }
    }

    @Override
    public CartDetail removeCartDetail(CartDetailDTO cartDetailDTO) {
        Cart cart = cartRepository.findById(cartDetailDTO.getCartId())
                .orElseThrow(() -> new EntityNotFoundException("Lỗi"));

        Color color = colorRepository.findById(cartDetailDTO.getColorId())
                .orElseThrow(() -> new EntityNotFoundException("Lỗi"));

        Optional<CartDetail> existingCartDetail = cartDetailRepository.findByCartAndColor(cart, color);

        if (existingCartDetail.isPresent()) {
            CartDetail cartDetail = existingCartDetail.get();
            Integer oldQuantity = cartDetail.getQuantity();
            if (oldQuantity <= 1) {
                cartDetailRepository.delete(cartDetail);
                return cartDetail;
            } else {
                cartDetail.setQuantity(oldQuantity - 1);
                return cartDetailRepository.save(cartDetail);
            }
        } else {
            throw new EntityNotFoundException("Chi tiết giỏ hàng không tồn tại");
        }

    }

    // @Override
    // public CartDetail removeCartDetail(Long id) {
    // CartDetail cartDetail = cartDetailRepository.findById(id)
    // .orElseThrow(() -> new EntityNotFoundException("CartDetail not found"));

    // Integer oldQuantity = cartDetail.getQuantity();

    // if (oldQuantity <= 1) {
    // cartDetailRepository.delete(cartDetail);
    // return cartDetail;
    // } else {
    // cartDetail.setQuantity(oldQuantity - 1);
    // }
    // return cartDetailRepository.save(cartDetail);
    // }

    @Override
    public CartDetail deleteCartDetail(CartDetailDTO cartDetailDTO) {
        Cart cart = cartRepository.findById(cartDetailDTO.getCartId())
                .orElseThrow(() -> new EntityNotFoundException("Lỗi"));

        Color color = colorRepository.findById(cartDetailDTO.getColorId())
                .orElseThrow(() -> new EntityNotFoundException("Lỗi"));

        Optional<CartDetail> existingCartDetail = cartDetailRepository.findByCartAndColor(cart, color);
        if (existingCartDetail.isPresent()) {
            CartDetail cartDetail = existingCartDetail.get();
            cartDetailRepository.delete(cartDetail);
            return cartDetail;
        } else {
            throw new EntityNotFoundException("Chi tiết giỏ hàng không tồn tại");
        }

    }

    // @Override
    // public CartDetail deleteCartDetail(Long id) {
    // CartDetail cartDetail = cartDetailRepository.findById(id)
    // .orElseThrow(() -> new EntityNotFoundException("CartDetail not found"));
    // cartDetailRepository.delete(cartDetail);
    // return cartDetail;
    // }

    @Override
    public List<CartDetail> clearByUserId(Long userId) {
        List<CartDetail> cartDetails = cartDetailRepository.findByCartUserId(userId);

        if (cartDetails.isEmpty()) {
            throw new EntityNotFoundException("Sai UserId: " + userId);
        }
        cartDetailRepository.deleteAll(cartDetails);
        return cartDetails;
    }

}
