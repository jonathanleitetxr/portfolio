package com.portfolio.portfolio.backend.service;

import com.portfolio.portfolio.backend.entity.Project;
import com.portfolio.portfolio.backend.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

// Active l'extension Mockito pour ce test, permet d'utiliser @Mock et @InjectMocks
@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    // Crée un faux repository, qui ne touche jamais à la vraie base de données
    @Mock
    private ProjectRepository projectRepository;

    // Crée une instance de ProjectService en lui injectant automatiquement le mock ci-dessus
    @InjectMocks
    private ProjectService projectService;

    @Test
    void getAllProjects_devraitRetournerLaListeDesProjets() {
        // ARRANGE : on prépare les données et le comportement attendu du mock
        Project project1 = new Project();
        project1.setTitle("New Pilote");

        Project project2 = new Project();
        project2.setTitle("Ce portfolio");

        List<Project> projetsAttendus = Arrays.asList(project1, project2);

        // On dit au mock : "quand on appelle findAll(), réponds avec cette liste"
        when(projectRepository.findAll()).thenReturn(projetsAttendus);

        // ACT : on appelle la vraie méthode qu'on veut tester
        List<Project> resultat = projectService.getAllProjects();

        // ASSERT : on vérifie que le résultat est celui attendu
        assertThat(resultat).hasSize(2);
        assertThat(resultat.get(0).getTitle()).isEqualTo("New Pilote");
        assertThat(resultat.get(1).getTitle()).isEqualTo("Ce portfolio");
    }

    @Test
    void getProjectById_devraitRetournerLeProjetSiTrouve() {
        // ARRANGE
        Project project = new Project();
        project.setId(1L);
        project.setTitle("New Pilote");

        // On simule : "quand on cherche l'id 1, on trouve ce projet"
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        // ACT
        Project resultat = projectService.getProjectById(1L);

        // ASSERT
        assertThat(resultat.getTitle()).isEqualTo("New Pilote");
    }

    @Test
    void getProjectById_devraitLeverUneExceptionSiNonTrouve() {
        // ARRANGE : on simule "aucun projet trouvé avec cet id"
        when(projectRepository.findById(999L)).thenReturn(Optional.empty());

        // ACT + ASSERT : on vérifie qu'une exception est bien levée
        assertThatThrownBy(() -> projectService.getProjectById(999L))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Projet non trouvé");
    }
}