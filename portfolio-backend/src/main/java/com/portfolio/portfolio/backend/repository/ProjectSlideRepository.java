package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.ProjectSlide;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectSlideRepository extends JpaRepository<ProjectSlide, Long> {
    List<ProjectSlide> findByProjectIdOrderBySlideOrder(Long projectId);
}