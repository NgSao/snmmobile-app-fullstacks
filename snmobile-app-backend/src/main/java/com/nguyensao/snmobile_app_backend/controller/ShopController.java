package com.nguyensao.snmobile_app_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyensao.snmobile_app_backend.dto.ShopDTO;
import com.nguyensao.snmobile_app_backend.entity.Shops;
import com.nguyensao.snmobile_app_backend.service.ShopService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/shops")
public class ShopController {
    private final ShopService shopService;

    @GetMapping
    public ResponseEntity<List<Shops>> index() {
        List<Shops> shops = shopService.index();
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Shops> create(@RequestBody ShopDTO shopDTO) {
        Shops createdShop = shopService.create(shopDTO);
        return new ResponseEntity<>(createdShop, HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Shops> show(@PathVariable Long id) {
        Shops shop = shopService.show(id);
        return new ResponseEntity<>(shop, HttpStatus.OK);
    }
}
