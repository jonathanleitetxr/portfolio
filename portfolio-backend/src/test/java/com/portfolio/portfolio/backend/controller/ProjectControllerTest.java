package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.entity.Project;
import com.portfolio.portfolio.backend.service.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.portfolio.portfolio.backend.config.SecurityConfig;
import org.springframework.context.annotation.Import;

// @WebMvcTest charge uniquement la couche web (controllers), pas toute l'application
// On précise quel controller on veut tester
@WebMvcTest(ProjectController.class)
@Import(SecurityConfig.class)
class ProjectControllerTest {

    // MockMvc simule des requêtes HTTP sans démarrer un vrai serveur
    @Autowired
    private MockMvc mockMvc;

    // On mock le service, comme on a mocké le repository précédemment
    @MockitoBean
    private ProjectService projectService;

    @Test
    void getAllProjects_devraitRetourner200EtLaListe() throws Exception {
        // ARRANGE
        Project project1 = new Project();
        project1.setId(1L);
        project1.setTitle("New Pilote");

        List<Project> projets = Arrays.asList(project1);
        when(projectService.getAllProjects()).thenReturn(projets);

        // ACT + ASSERT : on envoie une fausse requête GET et on vérifie la réponse
        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())                          // vérifie le code 200
                .andExpect(jsonPath("$[0].title").value("New Pilote")); // vérifie le contenu JSON
    }
}