package com.nguyensao.snmobile_app_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.dto.StockDTO;
import com.nguyensao.snmobile_app_backend.entity.Color;
import com.nguyensao.snmobile_app_backend.entity.Image;
import com.nguyensao.snmobile_app_backend.entity.Product;
import com.nguyensao.snmobile_app_backend.entity.Stock;
import com.nguyensao.snmobile_app_backend.repository.ColorRepository;
import com.nguyensao.snmobile_app_backend.repository.ImageRepository;
import com.nguyensao.snmobile_app_backend.repository.ProductRepository;
import com.nguyensao.snmobile_app_backend.repository.StockRepository;
import com.nguyensao.snmobile_app_backend.service.StockService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;

    private final ImageRepository imageRepository;

    @Override
    public List<Stock> index() {
        return stockRepository.findAll();
    }

    @Override
    public Stock store(StockDTO stockDTO) {
        Product product = productRepository.findById(stockDTO.getProductId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Product with ID " + stockDTO.getProductId() + "not found"));

        Stock stock = new Stock();
        stock.setProduct(product);
        stock.setSize(stockDTO.getSize());
        stock.setPrice(stockDTO.getPrice());
        Stock savedStock = stockRepository.save(stock);

        List<Color> colors = stockDTO.getColors().stream()
                .map(colorDTOs -> {
                    Color color = new Color();
                    color.setStock(stock);
                    color.setColor(colorDTOs.getColor());
                    color.setQuantity(colorDTOs.getQuantity());
                    colorRepository.save(color);
                    Image image = new Image();
                    image.setProduct(product);
                    image.setColor(color);
                    image.setImageUrl(colorDTOs.getImage().getImageUrl());
                    imageRepository.save(image);
                    color.setImage(image);
                    return color;
                })
                .collect(Collectors.toList());
        stock.setColors(colors);
        return stockRepository.save(savedStock);
    }

    @Override
    public List<Stock> findById(Long productId) {
        List<Stock> stocks = stockRepository.findByProduct_Id(productId);
        return stocks;
    }

    @Override
    public Stock findStockById(Long id) {
        return stockRepository.findById(id).orElse(null);
    }

}
