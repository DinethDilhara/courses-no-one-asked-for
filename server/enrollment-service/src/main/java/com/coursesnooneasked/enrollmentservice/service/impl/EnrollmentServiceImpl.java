package com.coursesnooneasked.enrollmentservice.service.impl;

import com.coursesnooneasked.enrollmentservice.controller.dto.*;
import com.coursesnooneasked.enrollmentservice.exception.BadRequestException;
import com.coursesnooneasked.enrollmentservice.model.Enrollment;
import com.coursesnooneasked.enrollmentservice.repository.EnrollmentRepository;
import com.coursesnooneasked.enrollmentservice.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    @Override
    public EnrollmentResponseDto enroll(EnrollCourseRequestDto request) {

        UUID userId = UUID.fromString(request.getUserId());
        UUID courseId = UUID.fromString(request.getCourseId());

        enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .ifPresent(e -> {throw new BadRequestException("Already enrolled in this course");
        });

        Enrollment enrollment = Enrollment.builder()
                .userId(userId)
                .courseId(courseId)
                .enrolledAt(LocalDateTime.now())
                .build();

        enrollment = enrollmentRepository.save(enrollment);

        return EnrollmentResponseDto.builder()
                .enrollmentId(enrollment.getId().toString())
                .userId(enrollment.getUserId().toString())
                .courseId(enrollment.getCourseId().toString())
                .enrolledAt(enrollment.getEnrolledAt().toString())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EnrolledCourseResponseDto> getUserEnrollments(String userId) {

        return enrollmentRepository
                .findByUserId(UUID.fromString(userId))
                .stream()
                .map(enrollment ->
                        EnrolledCourseResponseDto.builder()
                                .enrollmentId(enrollment.getId().toString())
                                .courseId(enrollment.getCourseId().toString())
                                .enrolledAt(enrollment.getEnrolledAt().toString())
                                .build()
                )
                .toList();
    }

    @Override
    public void removeEnrollment(String userId, String courseId) {

        Enrollment enrollment = enrollmentRepository
                        .findByUserIdAndCourseId(UUID.fromString(userId), UUID.fromString(courseId))
                        .orElseThrow(() -> new BadRequestException("Enrollment not found"));

        enrollmentRepository.delete(enrollment);
    }
}