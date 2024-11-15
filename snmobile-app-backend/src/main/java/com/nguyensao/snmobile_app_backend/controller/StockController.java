package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.dto.StockDTO;
import com.nguyensao.snmobile_app_backend.entity.Stock;
import com.nguyensao.snmobile_app_backend.service.StockService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    @GetMapping
    public ResponseEntity<List<Stock>> index() {
        List<Stock> stock = stockService.index();
        return new ResponseEntity<>(stock, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Stock> store(@RequestBody StockDTO stockDTO) {
        Stock savedStock = stockService.store(stockDTO);
        return new ResponseEntity<>(savedStock, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public List<Stock> getStocksByProductId(@PathVariable Long productId) {
        return stockService.findById(productId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stock> findStockById(@PathVariable Long id) {
        Stock stock = stockService.findStockById(id);
        return new ResponseEntity<>(stock, HttpStatus.OK);
    }
}
