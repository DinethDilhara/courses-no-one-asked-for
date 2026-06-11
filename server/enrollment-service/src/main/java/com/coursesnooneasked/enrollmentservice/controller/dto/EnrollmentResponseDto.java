package com.coursesnooneasked.enrollmentservice.controller.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentResponseDto {

    private String enrollmentId;
    private String userId;
    private String courseId;
    private String enrolledAt;
}