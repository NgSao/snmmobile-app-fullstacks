package com.nguyensao.snmobile_app_backend.mapper;

import com.nguyensao.snmobile_app_backend.dto.UserDTO;
import com.nguyensao.snmobile_app_backend.entity.User;

public class UserMapper {
    public static UserDTO mapToUserDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        userDTO.setAddress(user.getAddress());
        userDTO.setRole(user.getRole());
        return userDTO;
    }
}
