package com.nguyensao.snmobile_app_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HandleController {

    @PostMapping("/traloi")
    public String handleTraloi(@RequestBody String message) {
        return message;
    }
}
