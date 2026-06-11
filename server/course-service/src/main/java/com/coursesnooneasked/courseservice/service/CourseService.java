package com.coursesnooneasked.courseservice.service;

import com.coursesnooneasked.courseservice.controller.dto.CourseResponseDto;

import java.util.List;

public interface CourseService {

    List<CourseResponseDto> getAllCourses();

    CourseResponseDto getCourseById(String courseId);

}
