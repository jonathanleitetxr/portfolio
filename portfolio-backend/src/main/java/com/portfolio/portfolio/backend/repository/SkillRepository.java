package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}