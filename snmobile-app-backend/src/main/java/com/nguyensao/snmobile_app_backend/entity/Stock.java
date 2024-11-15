package com.nguyensao.snmobile_app_backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "stock")
@Data
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    // @JsonBackReference
    @JsonIgnore
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Long getProductId() {
        return product != null ? product.getId() : null;
    }

    private String size;
    private String price;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Color> colors;
}
