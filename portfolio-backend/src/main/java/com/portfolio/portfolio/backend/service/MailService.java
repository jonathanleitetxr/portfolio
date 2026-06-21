package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.dto.ContactFormRequest;
import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Value("${resend.api-key}")
    private String apiKey;

    @Value("${resend.from-email}")
    private String fromEmail;

    @Value("${resend.to-email}")
    private String toEmail;

    public void sendContactEmail(ContactFormRequest form) {
        Resend resend = new Resend(apiKey);

        String htmlContent = """
            <h2>Nouveau message depuis ton portfolio !</h2>
            <p><strong>De :</strong> %s (%s)</p>
            <p><strong>Sujet :</strong> %s</p>
            <p><strong>Message :</strong></p>
            <p>%s</p>
            """.formatted(form.getName(), form.getEmail(), form.getSubject(), form.getMessage());

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Portfolio <" + fromEmail + ">")
                .to(toEmail)
                .replyTo(form.getEmail())
                .subject("[Portfolio] " + form.getSubject())
                .html(htmlContent)
                .build();

        try {
            resend.emails().send(params);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'envoi de l'email", e);
        }
    }
}