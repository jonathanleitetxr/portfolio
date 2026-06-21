package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.dto.ContactFormRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    // Ton adresse email, celle qui recevra les messages du formulaire de contact
    @Value("${spring.mail.username}")
    private String recipientEmail;

    public void sendContactEmail(ContactFormRequest form) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setReplyTo(form.getEmail());
        message.setSubject("[Portfolio] " + form.getSubject());
        message.setText(
            "Nouveau message depuis ton portfolio !\n\n" +
            "De : " + form.getName() + " (" + form.getEmail() + ")\n\n" +
            "Message :\n" + form.getMessage()
        );
        mailSender.send(message);
    }
}