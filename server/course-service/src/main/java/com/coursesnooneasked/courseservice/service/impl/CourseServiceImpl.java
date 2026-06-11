package com.coursesnooneasked.courseservice.service.impl;

import com.coursesnooneasked.courseservice.controller.dto.CourseResponseDto;
import com.coursesnooneasked.courseservice.exception.BadRequestException;
import com.coursesnooneasked.courseservice.model.Course;
import com.coursesnooneasked.courseservice.repository.CourseRepository;
import com.coursesnooneasked.courseservice.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public List<CourseResponseDto> getAllCourses() {

        return courseRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public CourseResponseDto getCourseById(String courseId) {

        Course course = courseRepository.findById(UUID.fromString(courseId))
                .orElseThrow(() ->
                        new BadRequestException(
                                "Course not found with id : " + courseId
                        ));

        return mapToDto(course);
    }

    private CourseResponseDto mapToDto(Course course) {

        return CourseResponseDto.builder()
                .id(course.getId().toString())
                .title(course.getTitle())
                .description(course.getDescription())
                .author(course.getAuthor())
                .thumbnailUrl(course.getThumbnailUrl())
                .build();
    }
}