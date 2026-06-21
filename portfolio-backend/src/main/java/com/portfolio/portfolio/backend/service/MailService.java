package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.dto.ContactFormRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String recipientEmail;

    public void sendContactEmail(ContactFormRequest form) {
        if (mailSender == null) {
            throw new IllegalStateException("Le service d'envoi d'email n'est pas configuré actuellement");
        }

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