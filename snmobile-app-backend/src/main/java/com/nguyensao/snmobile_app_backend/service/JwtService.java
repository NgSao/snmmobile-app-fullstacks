package com.nguyensao.snmobile_app_backend.service;

import com.nguyensao.snmobile_app_backend.entity.User;

public interface JwtService {
    String extractUsername(String token);

    String generateToken(User user);
}
