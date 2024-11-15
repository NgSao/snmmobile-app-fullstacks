package com.nguyensao.snmobile_app_backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.entity.Banner;
import com.nguyensao.snmobile_app_backend.repository.BannerRepository;
import com.nguyensao.snmobile_app_backend.service.BannerService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BannerServiceImpl implements BannerService {
    private final BannerRepository BannerRepository;

    @Override
    public List<Banner> index() {
        return BannerRepository.findAll();

    }

    @Override
    public Banner store(Banner Banner) {
        return BannerRepository.save(Banner);
    }

}
