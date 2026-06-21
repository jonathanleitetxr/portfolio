package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.dto.ContactFormRequest;
import com.portfolio.portfolio.backend.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact-form")
@RequiredArgsConstructor
public class ContactFormController {

    private final MailService mailService;

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ContactFormRequest form) {
        try {
            mailService.sendContactEmail(form);
            return ResponseEntity.ok("Message envoyé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'envoi du message");
        }
    }
}