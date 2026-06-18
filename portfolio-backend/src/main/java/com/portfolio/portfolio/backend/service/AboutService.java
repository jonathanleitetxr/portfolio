package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.entity.About;
import com.portfolio.portfolio.backend.repository.AboutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AboutService {

    private final AboutRepository aboutRepository;

    // Récupère le contenu de la page about (il n'y en a qu'un seul)
    public Optional<About> getAbout() {
        return aboutRepository.findAll().stream().findFirst();
    }

    public About save(About about) {
        return aboutRepository.save(about);
    }
}