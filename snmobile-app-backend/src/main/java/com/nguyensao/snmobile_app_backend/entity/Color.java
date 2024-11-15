package com.nguyensao.snmobile_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "color")
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })

public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    public Long getStockId() {
        return stock != null ? stock.getId() : null;
    }

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer quantity;

    @OneToOne(mappedBy = "color", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Image image;
}
