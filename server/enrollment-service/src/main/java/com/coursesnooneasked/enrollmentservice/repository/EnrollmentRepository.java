package com.coursesnooneasked.enrollmentservice.repository;

import com.coursesnooneasked.enrollmentservice.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    List<Enrollment> findByUserId(UUID userId);

    Optional<Enrollment> findByUserIdAndCourseId(UUID userId, UUID courseId);

}