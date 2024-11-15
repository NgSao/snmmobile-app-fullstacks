package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.dto.CartDetailDTO;
import com.nguyensao.snmobile_app_backend.entity.Cart;
import com.nguyensao.snmobile_app_backend.entity.CartDetail;

public interface CartService {
    List<Cart> getCartAll();

    List<CartDetail> getCartDetailsByCartId(Long cartId);

    CartDetail createCartDetail(CartDetailDTO cartDetailDTO);

    CartDetail removeCartDetail(CartDetailDTO cartDetailDTO);

    // CartDetail removeCartDetail(Long id);

    CartDetail deleteCartDetail(CartDetailDTO cartDetailDTO);

    // CartDetail deleteCartDetail(Long id);

    List<CartDetail> clearByUserId(Long userId);

}
