package com.coursesnooneasked.enrollmentservice.service;

import com.coursesnooneasked.enrollmentservice.controller.dto.*;

import java.util.List;

public interface EnrollmentService {

    EnrollmentResponseDto enroll(EnrollCourseRequestDto request);

    List<EnrolledCourseResponseDto> getUserEnrollments(String userId);

    void removeEnrollment(String userId, String courseId);

}
