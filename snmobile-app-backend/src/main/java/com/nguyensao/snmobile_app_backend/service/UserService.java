package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.entity.User;

public interface UserService {
    User createUser(User user);

    List<User> getUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);
}
