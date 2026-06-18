package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository extends JpaRepository<About, Long> {
}