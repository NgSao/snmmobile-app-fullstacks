package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.entity.Brand;

public interface BrandService {
    List<Brand> index();

    Brand store(Brand brand);
}
