package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.dto.ShopDTO;
import com.nguyensao.snmobile_app_backend.entity.Shops;

public interface ShopService {
    List<Shops> index();

    Shops create(ShopDTO shopDTO);

    Shops show(Long id);

}
