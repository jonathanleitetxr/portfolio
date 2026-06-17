package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByFeaturedTrue();
}