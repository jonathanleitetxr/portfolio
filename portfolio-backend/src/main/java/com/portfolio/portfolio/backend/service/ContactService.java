package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.entity.Contact;
import com.portfolio.portfolio.backend.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    // Récupère le contenu de la page contact (il n'y en a qu'un seul)
    public Optional<Contact> getContact() {
        return contactRepository.findAll().stream().findFirst();
    }

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }
}