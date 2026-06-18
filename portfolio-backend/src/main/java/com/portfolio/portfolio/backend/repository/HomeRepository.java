package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.Home;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeRepository extends JpaRepository<Home, Long> {
}