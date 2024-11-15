package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.entity.Banner;

public interface BannerService {
    List<Banner> index();

    Banner store(Banner Banner);
}
