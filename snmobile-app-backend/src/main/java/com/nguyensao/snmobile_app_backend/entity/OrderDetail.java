package com.nguyensao.snmobile_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_detail")
@Data
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    @JsonBackReference
    private Color color;

    private Integer quantity;

    private String price;

    public String getColorColor() {
        return color != null ? color.getColor() : null;
    }

    public String getColorImage() {
        return color != null && color.getImage() != null ? color.getImage().getImageUrl() : null;
    }

    public Long getColorId() {
        return color != null ? color.getId() : null;
    }

    public String getProductName() {
        return color != null && color.getStock() != null && color.getStock().getProduct() != null
                ? color.getStock().getProduct().getName()
                : null;
    }

    public String getStockSize() {
        return color != null && color.getStock() != null ? color.getStock().getSize() : null;
    }

}
