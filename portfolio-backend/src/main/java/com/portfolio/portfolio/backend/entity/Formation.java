package com.portfolio.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "formations")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String startDate;

    private String endDate;

    @Column(name = "display_order")
    private int displayOrder;
}