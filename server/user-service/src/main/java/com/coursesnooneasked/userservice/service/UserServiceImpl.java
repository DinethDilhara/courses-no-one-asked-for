package com.coursesnooneasked.userservice.service;

import com.coursesnooneasked.userservice.controller.dto.AuthResponseDto;
import com.coursesnooneasked.userservice.controller.dto.LoginRequestDto;
import com.coursesnooneasked.userservice.controller.dto.UserResponseDto;
import com.coursesnooneasked.userservice.exception.BadRequestException;
import com.coursesnooneasked.userservice.exception.NotFoundException;
import com.coursesnooneasked.userservice.repository.UserRepository;
import com.coursesnooneasked.userservice.model.User;
import com.coursesnooneasked.userservice.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional(readOnly = true)
    public AuthResponseDto login(LoginRequestDto request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found with email : " + request.getEmail()));

        String token = jwtUtil.generateAccessToken(user);

        return AuthResponseDto.builder()
                .userId(user.getId().toString())
                .accessToken(token)
                .userRole(user.getRole().toString())
                .build();

    }

    @Override
    public UserResponseDto getCurrentUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new NotFoundException("User not found with email: " + email));

        return mapToDto(user);
    }

    @Override
    public UserResponseDto getUserById(String userId) {

        User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() ->
                        new NotFoundException("User not found with id: " + userId));

        return mapToDto(user);
    }

    private UserResponseDto mapToDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId().toString())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

}
