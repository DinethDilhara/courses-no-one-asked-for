package com.coursesnooneasked.userservice.controller.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private String id;
    private String name;
    private String email;
    private String role;
}
