package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.entity.Formation;
import com.portfolio.portfolio.backend.repository.FormationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FormationService {

    private final FormationRepository formationRepository;

    public List<Formation> getAllFormations() {
        return formationRepository.findAllByOrderByDisplayOrder();
    }

    public Formation create(Formation formation) {
        return formationRepository.save(formation);
    }

    public Formation update(Long id, Formation formation) {
        formation.setId(id);
        return formationRepository.save(formation);
    }

    public void delete(Long id) {
        formationRepository.deleteById(id);
    }
}