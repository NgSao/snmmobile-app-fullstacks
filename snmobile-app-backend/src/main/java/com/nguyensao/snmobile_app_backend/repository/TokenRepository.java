package com.nguyensao.snmobile_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyensao.snmobile_app_backend.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Integer> {
}