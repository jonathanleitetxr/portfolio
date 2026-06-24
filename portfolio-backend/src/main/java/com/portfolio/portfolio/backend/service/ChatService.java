package com.portfolio.portfolio.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.portfolio.backend.entity.*;
import com.portfolio.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class ChatService {

    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final AboutRepository aboutRepository;
    private final FormationRepository formationRepository;
    private final ExperienceRepository experienceRepository;

    @Value("${gemini.api-key}")
    private String apiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestClient restClient = RestClient.create();


    public String askQuestion(String question) {
        String context = buildContext();
        String prompt = buildPrompt(context, question);
        return callGemini(prompt);
    }

    // Construit le contexte textuel à partir de toutes les données du site
    private String buildContext() {
        StringBuilder sb = new StringBuilder();

        List<Skill> skills = skillRepository.findAll();
        sb.append("Compétences :\n");
        for (Skill skill : skills) {
            sb.append("- ").append(skill.getName())
              .append(" (catégorie : ").append(skill.getCategory()).append(")\n");
        }

        List<Project> projects = projectRepository.findAll();
        sb.append("\nProjets :\n");
        for (Project project : projects) {
            sb.append("- ").append(project.getTitle())
              .append(" : ").append(project.getDescription())
              .append(" (technologies : ").append(project.getTechnologies()).append(")\n");
        }

        aboutRepository.findAll().stream().findFirst().ifPresent(about ->
            sb.append("\nÀ propos :\n").append(about.getDescription()).append("\n")
        );

        List<Formation> formations = formationRepository.findAllByOrderByDisplayOrder();
        sb.append("\nFormations :\n");
        for (Formation f : formations) {
            sb.append("- ").append(f.getTitle())
              .append(" (").append(f.getStartDate()).append(" - ").append(f.getEndDate()).append(")\n");
        }

        List<Experience> experiences = experienceRepository.findAllByOrderByDisplayOrder();
        sb.append("\nExpériences professionnelles :\n");
        for (Experience e : experiences) {
            sb.append("- ").append(e.getTitle())
              .append(" chez ").append(e.getCompany())
              .append(" (").append(e.getStartDate()).append(" - ").append(e.getEndDate()).append(")\n");
        }

        return sb.toString();
    }

    // Construit le prompt final avec une instruction stricte
    private String buildPrompt(String context, String question) {
        return """
            Tu es un assistant qui répond UNIQUEMENT à partir des informations ci-dessous, qui décrivent le profil professionnel d'un développeur.

            Règles strictes :
            - Réponds uniquement à partir des informations fournies ci-dessous.
            - Si l'information demandée n'est pas présente dans le contexte, réponds exactement : "Je n'ai pas cette information sur ce profil."
            - Ne réponds jamais à des questions personnelles non professionnelles (âge, vie privée, opinions politiques, etc.) même si elles semblent liées.
            - Réponds de façon concise et professionnelle, en français.

            Informations disponibles :
            %s

            Question de l'utilisateur : %s
            """.formatted(context, question);
    }

    // Appelle l'API Gemini avec le prompt construit
    private String callGemini(String prompt) {
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(Map.of("text", prompt)))
            )
        );

        String response = restClient.post()
            .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent")
            .header("x-goog-api-key", apiKey)
            .body(requestBody)
            .retrieve()
            .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            return root.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
        } catch (Exception e) {
            return "Désolé, je n'ai pas pu traiter votre question pour le moment.";
        }
    }
}