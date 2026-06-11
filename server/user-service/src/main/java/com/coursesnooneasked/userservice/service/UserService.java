package com.coursesnooneasked.userservice.service;

import com.coursesnooneasked.userservice.controller.dto.AuthResponseDto;
import com.coursesnooneasked.userservice.controller.dto.LoginRequestDto;
import com.coursesnooneasked.userservice.controller.dto.UserResponseDto;

public interface UserService {

    AuthResponseDto login(LoginRequestDto request);

    UserResponseDto getCurrentUser(String email);

    UserResponseDto getUserById(String userId);
}
