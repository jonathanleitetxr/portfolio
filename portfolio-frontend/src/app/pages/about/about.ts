import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { AboutService, AboutContent } from '../../services/about';
import { FormationService, Formation } from '../../services/formation';
import { ExperienceService, Experience } from '../../services/experience';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule, DragDropModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  aboutContent = signal<AboutContent | null>(null);
  formations = signal<Formation[]>([]);
  experiences = signal<Experience[]>([]);

  // Modal "Qui suis-je"
  isEditAboutModalOpen = signal<boolean>(false);
  aboutEditForm = { description: '' };

  // Modal Formation (création ou modification)
  isFormationModalOpen = signal<boolean>(false);
  formationModalMode: 'create' | 'edit' = 'create';
  formationEditingId: number | null = null;
  formationForm = { title: '', startDate: '', endDate: '' };

  // Modal Expérience (création ou modification)
  isExperienceModalOpen = signal<boolean>(false);
  experienceModalMode: 'create' | 'edit' = 'create';
  experienceEditingId: number | null = null;
  experienceForm = { title: '', company: '', startDate: '', endDate: '', description: '' };

  constructor(
    private aboutService: AboutService,
    private formationService: FormationService,
    private experienceService: ExperienceService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAbout();
    this.loadFormations();
    this.loadExperiences();
  }

  loadAbout(): void {
    this.aboutService.getAbout().subscribe({
      next: (data) => this.aboutContent.set(data),
      error: (err) => console.error('Erreur about', err)
    });
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe({
      next: (data) => this.formations.set(data),
      error: (err) => console.error('Erreur formations', err)
    });
  }

  loadExperiences(): void {
    this.experienceService.getAllExperiences().subscribe({
      next: (data) => this.experiences.set(data),
      error: (err) => console.error('Erreur experiences', err)
    });
  }

  // --- Gestion "Qui suis-je" ---

  openEditAboutModal(): void {
    const current = this.aboutContent();
    if (current) {
      this.aboutEditForm = { description: current.description };
    }
    this.isEditAboutModalOpen.set(true);
  }

  closeEditAboutModal(): void {
    this.isEditAboutModalOpen.set(false);
  }

  saveAboutChanges(): void {
    const current = this.aboutContent();
    if (!current) return;

    const updated: AboutContent = {
      id: current.id,
      description: this.aboutEditForm.description
    };

    this.aboutService.updateAbout(updated).subscribe({
      next: (data) => {
        this.aboutContent.set(data);
        this.isEditAboutModalOpen.set(false);
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }

  // --- Gestion Formation ---

  openCreateFormationModal(): void {
    this.formationModalMode = 'create';
    this.formationForm = { title: '', startDate: '', endDate: '' };
    this.isFormationModalOpen.set(true);
  }

  openEditFormationModal(formation: Formation): void {
    this.formationModalMode = 'edit';
    this.formationEditingId = formation.id;
    this.formationForm = {
      title: formation.title,
      startDate: formation.startDate,
      endDate: formation.endDate
    };
    this.isFormationModalOpen.set(true);
  }

  closeFormationModal(): void {
    this.isFormationModalOpen.set(false);
  }

  saveFormation(): void {
    if (this.formationModalMode === 'create') {
      const newOrder = this.formations().length;
      this.formationService.createFormation({ ...this.formationForm, displayOrder: newOrder }).subscribe({
        next: () => {
          this.loadFormations();
          this.isFormationModalOpen.set(false);
        },
        error: (err) => console.error('Erreur création formation', err)
      });
    } else if (this.formationEditingId !== null) {
      this.formationService.updateFormation(this.formationEditingId, this.formationForm).subscribe({
        next: () => {
          this.loadFormations();
          this.isFormationModalOpen.set(false);
        },
        error: (err) => console.error('Erreur modification formation', err)
      });
    }
  }

  deleteFormation(id: number): void {
    if (confirm('Supprimer cette formation ?')) {
      this.formationService.deleteFormation(id).subscribe({
        next: () => this.loadFormations(),
        error: (err) => console.error('Erreur suppression formation', err)
      });
    }
  }

  // --- Gestion Expérience ---

  openCreateExperienceModal(): void {
    this.experienceModalMode = 'create';
    this.experienceForm = { title: '', company: '', startDate: '', endDate: '', description: '' };
    this.isExperienceModalOpen.set(true);
  }

  openEditExperienceModal(experience: Experience): void {
    this.experienceModalMode = 'edit';
    this.experienceEditingId = experience.id;
    this.experienceForm = {
      title: experience.title,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description
    };
    this.isExperienceModalOpen.set(true);
  }

  closeExperienceModal(): void {
    this.isExperienceModalOpen.set(false);
  }

  saveExperience(): void {
    if (this.experienceModalMode === 'create') {
      const newOrder = this.experiences().length;
      this.experienceService.createExperience({ ...this.experienceForm, displayOrder: newOrder }).subscribe({
        next: () => {
          this.loadExperiences();
          this.isExperienceModalOpen.set(false);
        },
        error: (err) => console.error('Erreur création expérience', err)
      });
    } else if (this.experienceEditingId !== null) {
      this.experienceService.updateExperience(this.experienceEditingId, this.experienceForm).subscribe({
        next: () => {
          this.loadExperiences();
          this.isExperienceModalOpen.set(false);
        },
        error: (err) => console.error('Erreur modification expérience', err)
      });
    }
  }

  deleteExperience(id: number): void {
    if (confirm('Supprimer cette expérience ?')) {
      this.experienceService.deleteExperience(id).subscribe({
        next: () => this.loadExperiences(),
        error: (err) => console.error('Erreur suppression expérience', err)
      });
    }
  }

  // Nouvelle méthode : appelée quand on relâche un élément après l'avoir glissé
  onFormationDrop(event: CdkDragDrop<Formation[]>): void {
    const list = [...this.formations()];
    moveItemInArray(list, event.previousIndex, event.currentIndex);
    this.formations.set(list);

    // On met à jour le displayOrder de chaque élément selon sa nouvelle position
    list.forEach((formation, index) => {
      this.formationService.updateFormation(formation.id, { ...formation, displayOrder: index }).subscribe();
    });
  }

  onExperienceDrop(event: CdkDragDrop<Experience[]>): void {
    const list = [...this.experiences()];
    moveItemInArray(list, event.previousIndex, event.currentIndex);
    this.experiences.set(list);

    list.forEach((experience, index) => {
      this.experienceService.updateExperience(experience.id, { ...experience, displayOrder: index }).subscribe();
    });
  }

}