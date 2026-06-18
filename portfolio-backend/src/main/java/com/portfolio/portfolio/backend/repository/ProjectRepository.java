package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}