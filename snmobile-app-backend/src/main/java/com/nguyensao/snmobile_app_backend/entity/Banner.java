package com.nguyensao.snmobile_app_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "banner")
@Data
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

}
