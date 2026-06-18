package com.portfolio.portfolio.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String technologies;

    private String imageUrl;

    private String githubUrl;

    private String demoUrl;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean featured;

    // Relation One-to-Many : un projet peut avoir plusieurs slides
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<ProjectSlide> slides;
}