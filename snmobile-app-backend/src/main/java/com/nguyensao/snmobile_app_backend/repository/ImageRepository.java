package com.nguyensao.snmobile_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyensao.snmobile_app_backend.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
