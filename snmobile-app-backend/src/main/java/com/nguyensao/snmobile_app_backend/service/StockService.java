package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.dto.StockDTO;
import com.nguyensao.snmobile_app_backend.entity.Stock;

public interface StockService {
    List<Stock> index();

    Stock store(StockDTO stockDTO);

    List<Stock> findById(Long productId);

    Stock findStockById(Long id);

}
