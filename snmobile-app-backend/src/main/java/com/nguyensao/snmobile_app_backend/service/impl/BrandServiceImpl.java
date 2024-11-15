package com.nguyensao.snmobile_app_backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.entity.Brand;
import com.nguyensao.snmobile_app_backend.repository.BrandRepository;
import com.nguyensao.snmobile_app_backend.service.BrandService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Override
    public List<Brand> index() {
        return brandRepository.findAll();

    }

    @Override
    public Brand store(Brand brand) {
        return brandRepository.save(brand);
    }

}
