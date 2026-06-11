package com.coursesnooneasked.courseservice.controller;

import com.coursesnooneasked.courseservice.controller.dto.CourseResponseDto;
import com.coursesnooneasked.courseservice.service.CourseService;
import com.coursesnooneasked.courseservice.util.ApiResponse;
import com.coursesnooneasked.courseservice.util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponseDto>>> getAllCourses() {

        List<CourseResponseDto> courses = courseService.getAllCourses();

        return ResponseEntity.ok(
                ApiResponseBuilder.success("Courses retrieved successfully", courses)
        );
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<ApiResponse<CourseResponseDto>> getCourseById(@PathVariable String courseId) {

        CourseResponseDto course = courseService.getCourseById(courseId);

        return ResponseEntity.ok(
                ApiResponseBuilder.success("Course retrieved successfully", course)
        );
    }
}