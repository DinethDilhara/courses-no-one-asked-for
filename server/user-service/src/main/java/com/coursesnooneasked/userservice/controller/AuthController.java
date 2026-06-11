package com.coursesnooneasked.userservice.controller;

import com.coursesnooneasked.userservice.controller.dto.AuthResponseDto;
import com.coursesnooneasked.userservice.controller.dto.LoginRequestDto;
import com.coursesnooneasked.userservice.service.UserService;
import com.coursesnooneasked.userservice.util.ApiResponse;
import com.coursesnooneasked.userservice.util.ApiResponseBuilder;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<ApiResponse<AuthResponseDto>> login(@Valid @RequestBody LoginRequestDto request) {

        AuthResponseDto responseDto = userService.login(request);

        return ResponseEntity.ok()
                .body(ApiResponseBuilder.success("Login successful", responseDto));
    }
}
