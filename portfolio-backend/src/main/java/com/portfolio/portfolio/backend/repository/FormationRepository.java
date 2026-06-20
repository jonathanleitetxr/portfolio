package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FormationRepository extends JpaRepository<Formation, Long> {
    List<Formation> findAllByOrderByDisplayOrder();
}