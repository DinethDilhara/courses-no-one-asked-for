package com.coursesnooneasked.courseservice.controller.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponseDto {

    private String id;
    private String title;
    private String description;
    private String author;
    private String thumbnailUrl;
}