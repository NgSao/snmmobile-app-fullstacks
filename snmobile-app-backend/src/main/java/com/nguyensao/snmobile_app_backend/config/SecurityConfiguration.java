package com.nguyensao.snmobile_app_backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
        private final AuthenticationFilter authenticationFilter;
        private final AuthenticationProvider authenticationProvider;

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests((authorize) -> authorize
                                                .requestMatchers("/api/auth/**").permitAll()
                                                .requestMatchers("/api/user/**").permitAll()
                                                .requestMatchers("/api/banners/**").permitAll()
                                                .requestMatchers("/api/brands/**").permitAll()
                                                .requestMatchers("/api/products/**").permitAll()
                                                .requestMatchers("/api/categories/**").permitAll()
                                                .requestMatchers("/api/stocks/**").permitAll()
                                                .requestMatchers("/api/carts/**").permitAll()
                                                .requestMatchers("/api/orders/**").permitAll()
                                                .requestMatchers("/api/shops/**").permitAll()
                                                .requestMatchers("/api/email/**").permitAll()
                                                .requestMatchers("/api/payment/**").permitAll()
                                                .requestMatchers("/api/vnpayment/**").permitAll()
                                                .requestMatchers("/api/paypal/**").permitAll()
                                                .requestMatchers("/api/zalopay/**").permitAll()
                                                .requestMatchers("/api/momo/**").permitAll()
                                                .requestMatchers("/api/otp/**").permitAll()
                                                .requestMatchers("/myhandler/**").permitAll()

                                                .requestMatchers("/img/**").permitAll()
                                                .anyRequest()
                                                .authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(authenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class)
                                .httpBasic(Customizer.withDefaults());
                return http.build();
        }

}
