package com.nguyensao.snmobile_app_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyensao.snmobile_app_backend.entity.Cart;
import com.nguyensao.snmobile_app_backend.entity.CartDetail;
import com.nguyensao.snmobile_app_backend.entity.Color;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {

    Optional<CartDetail> findByCartAndColor(Cart cart, Color color);

    List<CartDetail> findByCartUserId(Long userId);

    List<CartDetail> findByCart_Id(Long cartId);

}
