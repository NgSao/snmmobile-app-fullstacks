package com.nguyensao.snmobile_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_custommer")
@Data
public class OrderCustommer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    @JsonBackReference
    private Shops shops;

    private String name;
    private String address;
    private String note;
    private String phone;
    private String email;
    private String nameOther;
    private String phoneOther;

    public Long getShopId() {
        return shops != null ? shops.getId() : null;
    }
}
