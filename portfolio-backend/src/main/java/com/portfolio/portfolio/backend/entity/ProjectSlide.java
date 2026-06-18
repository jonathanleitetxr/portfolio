package com.portfolio.portfolio.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "project_slides")
public class ProjectSlide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    private String imageUrl;

    private String tag;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "slide_order")
    private int slideOrder;
}