package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.entity.Home;
import com.portfolio.portfolio.backend.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping
    public ResponseEntity<Home> getHome() {
        return homeService.getHome()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<Home> updateHome(@RequestBody Home home) {
        return ResponseEntity.ok(homeService.save(home));
    }
}