package com.coursesnooneasked.userservice.controller;

import com.coursesnooneasked.userservice.controller.dto.AuthResponseDto;
import com.coursesnooneasked.userservice.controller.dto.UserResponseDto;
import com.coursesnooneasked.userservice.service.UserService;
import com.coursesnooneasked.userservice.util.ApiResponse;
import com.coursesnooneasked.userservice.util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDto>> getMyProfile(Authentication authentication) {

        String email = authentication.getName();

        System.out.println(authentication);
        System.out.println(authentication.getAuthorities());

        UserResponseDto responseDto = userService.getCurrentUser(email);

        return ResponseEntity.ok()
                .body(ApiResponseBuilder.success("Login successful", responseDto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUserById(@PathVariable String userId) {

        UserResponseDto responseDto = userService.getUserById(userId);

        return ResponseEntity.ok()
                .body(ApiResponseBuilder.success("Login successful", responseDto));
    }



}
