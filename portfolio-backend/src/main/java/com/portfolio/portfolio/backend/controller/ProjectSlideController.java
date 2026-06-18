package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.entity.ProjectSlide;
import com.portfolio.portfolio.backend.service.ProjectSlideService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectSlideController {

    private final ProjectSlideService projectSlideService;

    // Récupère les slides d'un projet précis
    // Exemple : GET /api/projects/1/slides
    @GetMapping("/{projectId}/slides")
    public List<ProjectSlide> getSlidesByProject(@PathVariable Long projectId) {
        return projectSlideService.getSlidesByProjectId(projectId);
    }
}