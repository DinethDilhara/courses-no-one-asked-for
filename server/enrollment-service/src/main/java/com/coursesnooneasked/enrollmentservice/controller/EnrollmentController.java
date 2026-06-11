package com.coursesnooneasked.enrollmentservice.controller;

import com.coursesnooneasked.enrollmentservice.controller.dto.*;
import com.coursesnooneasked.enrollmentservice.service.EnrollmentService;
import com.coursesnooneasked.enrollmentservice.util.ApiResponse;
import com.coursesnooneasked.enrollmentservice.util.ApiResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<EnrollmentResponseDto>> enroll(@RequestBody EnrollCourseRequestDto request) {

        return ResponseEntity.ok(
                ApiResponseBuilder.success("Enrollment successful", enrollmentService.enroll(request))
        );
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<EnrolledCourseResponseDto>>> getUserEnrollments(@PathVariable String userId) {

        return ResponseEntity.ok(
                ApiResponseBuilder.success(
                        "Enrollments retrieved successfully", enrollmentService.getUserEnrollments(userId))
        );
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>>
    removeEnrollment(@RequestParam String userId, @RequestParam String courseId) {

        enrollmentService.removeEnrollment(userId, courseId);

        return ResponseEntity.ok(
                ApiResponseBuilder.success("Enrollment removed successfully", null)
        );
    }
}