package com.portfolio.portfolio.backend.repository;

import com.portfolio.portfolio.backend.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}