package com.nguyensao.snmobile_app_backend.service;

import com.nguyensao.snmobile_app_backend.model.AuthenticationRequest;
import com.nguyensao.snmobile_app_backend.model.AuthenticationResponse;
import com.nguyensao.snmobile_app_backend.model.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);
}