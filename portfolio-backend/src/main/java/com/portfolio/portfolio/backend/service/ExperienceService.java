package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.entity.Experience;
import com.portfolio.portfolio.backend.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrder();
    }

    public Experience create(Experience experience) {
        return experienceRepository.save(experience);
    }

    public Experience update(Long id, Experience experience) {
        experience.setId(id);
        return experienceRepository.save(experience);
    }

    public void delete(Long id) {
        experienceRepository.deleteById(id);
    }
}