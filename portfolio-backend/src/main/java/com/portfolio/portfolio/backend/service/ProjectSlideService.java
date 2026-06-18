package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.entity.ProjectSlide;
import com.portfolio.portfolio.backend.repository.ProjectSlideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectSlideService {

    private final ProjectSlideRepository projectSlideRepository;

    // Récupère toutes les slides d'un projet, triées dans l'ordre
    public List<ProjectSlide> getSlidesByProjectId(Long projectId) {
        return projectSlideRepository.findByProjectIdOrderBySlideOrder(projectId);
    }

    public ProjectSlide save(ProjectSlide slide) {
        return projectSlideRepository.save(slide);
    }

    public void delete(Long id) {
        projectSlideRepository.deleteById(id);
    }
}