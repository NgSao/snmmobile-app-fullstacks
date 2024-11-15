package com.nguyensao.snmobile_app_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://192.168.1.111:8080",
                        "http://localhost:8080")
                // http://localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Cho phép các
                .allowedHeaders("*") // Cho phép tất cả các headers
                .allowCredentials(true);
    }

}
