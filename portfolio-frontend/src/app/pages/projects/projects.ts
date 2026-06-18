import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { ProjectService, Project } from '../../services/project';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  projects = signal<Project[]>([]);

  // Projet actuellement affiché dans la modal
  selectedProject = signal<Project | null>(null);

  isModalOpen = false;
  isAnimating = false;
  currentImage = 0;

  startTop = 0;
  startLeft = 0;
  startWidth = 0;
  startHeight = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets', err);
      }
    });
  }

  // Détermine si un projet doit afficher une modal (s'il a des slides)
  hasSlides(project: Project): boolean {
    return project.slides && project.slides.length > 0;
  }

  openModal(event: MouseEvent, project: Project) {
    event.stopPropagation();
    const card = (event.currentTarget as HTMLElement).getBoundingClientRect();

    this.startTop = card.top;
    this.startLeft = card.left;
    this.startWidth = card.width;
    this.startHeight = card.height;

    this.selectedProject.set(project);
    this.isModalOpen = true;
    this.isAnimating = false;
    this.currentImage = 0;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();

    setTimeout(() => {
      this.isAnimating = true;
      this.cdr.detectChanges();
    }, 20);
  }

  closeModal() {
    this.isAnimating = false;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.isModalOpen = false;
      document.body.style.overflow = '';
      this.cdr.detectChanges();
    }, 350);
  }

  nextImage() {
    const total = this.selectedProject()?.slides.length || 1;
    this.currentImage = (this.currentImage + 1) % total;
  }

  prevImage() {
    const total = this.selectedProject()?.slides.length || 1;
    this.currentImage = (this.currentImage - 1 + total) % total;
  }
}