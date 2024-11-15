package com.nguyensao.snmobile_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cart_detail")
@Data
public class CartDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    @JsonBackReference
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    @JsonBackReference
    private Color color;

    private Integer quantity;

    public Long getCartId() {
        return cart != null ? cart.getId() : null;
    }

    public Long getColorId() {
        return color != null ? color.getId() : null;
    }

}
