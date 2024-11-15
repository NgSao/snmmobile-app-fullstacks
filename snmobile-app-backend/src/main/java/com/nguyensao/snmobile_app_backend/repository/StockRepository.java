package com.nguyensao.snmobile_app_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyensao.snmobile_app_backend.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByProduct_Id(Long productId);

}
