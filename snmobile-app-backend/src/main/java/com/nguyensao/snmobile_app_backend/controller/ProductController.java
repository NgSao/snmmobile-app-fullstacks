package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.dto.ImageDTO;
import com.nguyensao.snmobile_app_backend.dto.ProductDTO;
import com.nguyensao.snmobile_app_backend.dto.ProductStockDTO;
import com.nguyensao.snmobile_app_backend.entity.Product;
import com.nguyensao.snmobile_app_backend.service.ProductService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> index() {
        List<Product> products = productService.index();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> store(@RequestBody ProductDTO productDTO) {
        Product savedProduct = productService.store(productDTO);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductStockDTO>> getProductStocks() {
        List<ProductStockDTO> products = productService.getProductStocks();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/images/{id}")
    public List<ImageDTO> getProductImages(@PathVariable Long id) {
        return productService.getProductImagesById(id);
    }

    @GetMapping("/color/{colorId}")
    public ResponseEntity<ProductStockDTO> getProductsByColorId(@PathVariable Long colorId) {
        ProductStockDTO products = productService.getByColorId(colorId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

}
