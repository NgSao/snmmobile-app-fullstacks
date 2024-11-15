package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.entity.Banner;
import com.nguyensao.snmobile_app_backend.service.BannerService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/banners")
public class BannerController {

    private final BannerService bannerService;

    @GetMapping
    public ResponseEntity<List<Banner>> index() {
        List<Banner> banners = bannerService.index();
        return new ResponseEntity<>(banners, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Banner> store(@RequestBody Banner Banner) {
        Banner saveBanner = bannerService.store(Banner);
        return new ResponseEntity<>(saveBanner, HttpStatus.CREATED);
    }

}
