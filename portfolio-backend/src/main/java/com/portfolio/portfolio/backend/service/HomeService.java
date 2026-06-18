package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.entity.Home;
import com.portfolio.portfolio.backend.repository.HomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final HomeRepository homeRepository;

    // Récupère le contenu de la page home (il n'y en a qu'un seul)
    public Optional<Home> getHome() {
        return homeRepository.findAll().stream().findFirst();
    }

    public Home save(Home home) {
        return homeRepository.save(home);
    }
}