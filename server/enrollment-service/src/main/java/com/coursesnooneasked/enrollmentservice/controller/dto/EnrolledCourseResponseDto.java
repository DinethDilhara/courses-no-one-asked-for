package com.coursesnooneasked.enrollmentservice.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrolledCourseResponseDto {

    private String enrollmentId;
    private String courseId;
    private String enrolledAt;
}