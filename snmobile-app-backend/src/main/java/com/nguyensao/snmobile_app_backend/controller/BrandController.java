package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.entity.Brand;
import com.nguyensao.snmobile_app_backend.service.BrandService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public ResponseEntity<List<Brand>> index() {
        List<Brand> brands = brandService.index();
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Brand> store(@RequestBody Brand brand) {
        Brand saveBrand = brandService.store(brand);
        return new ResponseEntity<>(saveBrand, HttpStatus.CREATED);
    }

}
