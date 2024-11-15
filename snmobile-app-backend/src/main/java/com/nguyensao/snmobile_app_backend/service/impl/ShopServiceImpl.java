package com.nguyensao.snmobile_app_backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.dto.ShopDTO;
import com.nguyensao.snmobile_app_backend.entity.Shops;
import com.nguyensao.snmobile_app_backend.entity.User;
import com.nguyensao.snmobile_app_backend.repository.ShoppsRepository;
import com.nguyensao.snmobile_app_backend.repository.UserRepository;
import com.nguyensao.snmobile_app_backend.service.ShopService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShopServiceImpl implements ShopService {
    private final ShoppsRepository shoppsRepository;
    private final UserRepository userRepository;

    public List<Shops> index() {
        return shoppsRepository.findAll();
    }

    public Shops create(ShopDTO shopDTO) {
        User user = userRepository.findById(shopDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("ID not found"));
        Shops shops = new Shops();
        shops.setUser(user);
        shops.setName(shopDTO.getName());
        shops.setAddress(shopDTO.getAddress());
        shops.setCreatedAt(LocalDateTime.now());
        return shoppsRepository.save(shops);
    }

    public Shops show(Long id) {
        return shoppsRepository.findById(id).orElse(null);
    }

}
