package com.nguyensao.snmobile_app_backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.dto.UserDTO;
import com.nguyensao.snmobile_app_backend.entity.Cart;
// import com.nguyensao.snmobile_app_backend.entity.Cart;
import com.nguyensao.snmobile_app_backend.entity.Token;
import com.nguyensao.snmobile_app_backend.entity.User;
import com.nguyensao.snmobile_app_backend.enums.Role;
import com.nguyensao.snmobile_app_backend.mapper.UserMapper;
import com.nguyensao.snmobile_app_backend.model.AuthenticationRequest;
import com.nguyensao.snmobile_app_backend.model.AuthenticationResponse;
import com.nguyensao.snmobile_app_backend.model.RegisterRequest;
import com.nguyensao.snmobile_app_backend.repository.CartRepository;
import com.nguyensao.snmobile_app_backend.repository.TokenRepository;
import com.nguyensao.snmobile_app_backend.repository.UserRepository;
import com.nguyensao.snmobile_app_backend.service.AuthenticationService;

import java.time.LocalDateTime;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

        private final UserRepository userRepository;
        private final TokenRepository tokenRepository;
        private final JwtServiceImpl jwtService;
        private final AuthenticationManager authenticationManager;
        private final PasswordEncoder passwordEncoder;
        private final CartRepository cartRepository;

        @Override
        public AuthenticationResponse register(RegisterRequest request) {
                User newUser = new User();
                newUser.setUsername(request.getUsername());
                newUser.setPassword(passwordEncoder.encode(request.getPassword()));
                newUser.setName(request.getName());
                // Xử lý vai trò
                if (!isValidRole(request.getRole())) {
                        throw new IllegalArgumentException("Invalid role");
                }

                Role userRole = Role.valueOf(request.getRole());
                newUser.setRole(userRole);
                newUser.setCreatedAt(LocalDateTime.now());
                User createdUser = userRepository.save(newUser);

                // Tạo cart
                Cart cart = new Cart();
                cart.setUser(createdUser);
                cart.setCreatedAt(LocalDateTime.now());
                cartRepository.save(cart);

                String jwtToken = jwtService.generateToken(createdUser);
                Token token = Token.builder()
                                .userId(createdUser.getId())
                                .token(jwtToken)
                                .expired(false)
                                .revoked(false)
                                .build();
                tokenRepository.save(token);

                return AuthenticationResponse.builder()
                                .userDTO(UserMapper.mapToUserDto(createdUser))
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse login(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getUsername(),
                                                request.getPassword()));
                User user = userRepository.findByUsername(request.getUsername())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                Token token = Token.builder()
                                .userId(user.getId())
                                .token(jwtToken)
                                .expired(false)
                                .revoked(false)
                                .build();
                tokenRepository.save(token);
                UserDTO userDTO = UserMapper.mapToUserDto(user);
                return AuthenticationResponse.builder()
                                .userDTO(userDTO)
                                .token(jwtToken)
                                .build();
        }

        private boolean isValidRole(String role) {
                return Arrays.stream(Role.values()).anyMatch(r -> r.name().equalsIgnoreCase(role));
        }
}
