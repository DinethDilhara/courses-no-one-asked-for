package com.coursesnooneasked.enrollmentservice.controller.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollCourseRequestDto {

    private String userId;
    private String courseId;
}
