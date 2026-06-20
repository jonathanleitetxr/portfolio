package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.entity.Contact;
import com.portfolio.portfolio.backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<Contact> getContact() {
        return contactService.getContact()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<Contact> updateContact(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.save(contact));
    }
}