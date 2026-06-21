package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.entity.Project;
import com.portfolio.portfolio.backend.entity.ProjectSlide;
import com.portfolio.portfolio.backend.service.ProjectService;
import com.portfolio.portfolio.backend.service.ProjectSlideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/slides")
@RequiredArgsConstructor
public class ProjectSlideController {

    private final ProjectSlideService projectSlideService;
    private final ProjectService projectService;

    @GetMapping
    public List<ProjectSlide> getSlidesByProject(@PathVariable Long projectId) {
        return projectSlideService.getSlidesByProjectId(projectId);
    }

    @PostMapping
    public ResponseEntity<ProjectSlide> createSlide(@PathVariable Long projectId, @RequestBody ProjectSlide slide) {
        Project project = projectService.getProjectById(projectId);
        slide.setProject(project);
        return ResponseEntity.ok(projectSlideService.save(slide));
    }

    @PutMapping("/{slideId}")
    public ResponseEntity<ProjectSlide> updateSlide(@PathVariable Long projectId, @PathVariable Long slideId, @RequestBody ProjectSlide slide) {
        Project project = projectService.getProjectById(projectId);
        slide.setId(slideId);
        slide.setProject(project);
        return ResponseEntity.ok(projectSlideService.save(slide));
    }

    @DeleteMapping("/{slideId}")
    public ResponseEntity<Void> deleteSlide(@PathVariable Long projectId, @PathVariable Long slideId) {
        projectSlideService.delete(slideId);
        return ResponseEntity.noContent().build();
    }
}