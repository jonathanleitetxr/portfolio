package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.entity.Formation;
import com.portfolio.portfolio.backend.service.FormationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/formations")
@RequiredArgsConstructor
public class FormationController {

    private final FormationService formationService;

    @GetMapping
    public List<Formation> getAllFormations() {
        return formationService.getAllFormations();
    }

    @PostMapping
    public ResponseEntity<Formation> createFormation(@RequestBody Formation formation) {
        return ResponseEntity.ok(formationService.create(formation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formation> updateFormation(@PathVariable Long id, @RequestBody Formation formation) {
        return ResponseEntity.ok(formationService.update(id, formation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable Long id) {
        formationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}