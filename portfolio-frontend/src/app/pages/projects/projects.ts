import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ProjectService, Project } from '../../services/project';

@Component({
  selector: 'app-projects',
  imports: [NgStyle],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  // Données venant de l'API
  projects = signal<Project[]>([]);

  // État de la modal
  isModalOpen = false;
  isAnimating = false;
  currentImage = 0;
  totalImages = 4;
  images = [0, 1, 2, 3];

  // Position de départ pour l'animation FLIP
  startTop = 0;
  startLeft = 0;
  startWidth = 0;
  startHeight = 0;

  slides = [
    { tag: 'Kanban & Drag and Drop', description: "Développement d'un système de drag & drop permettant de changer le statut des projets de manière intuitive. Chaque projet dispose d'un pourcentage d'avancement." },
    { tag: 'Module de commentaires', description: "Intégration du module de commentaires existant de CAutomatique et CsmArt, principalement conçu en PHP. J'ai dû adapter ce module à mes besoins tant au niveau des fonctionnalités que du design." },
    { tag: 'Budget & Badgeage', description: "Développement des fonctionnalités les plus complexes du projet. Le module budget calcule automatiquement la somme des badgeages en jours pour comparer le budget consommé au budget prévu." },
    { tag: 'Pilotage & ARM', description: "Développement de l'ARM (Analyse Risque Métier) permettant de décider si un projet passe en développement. Création d'un tableau avec DataTable générant automatiquement des exports Excel et PDF." }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Récupère tous les projets depuis l'API
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets', err);
      }
    });
  }

  openModal(event: MouseEvent) {
    event.stopPropagation();
    const card = (event.currentTarget as HTMLElement).getBoundingClientRect();

    this.startTop = card.top;
    this.startLeft = card.left;
    this.startWidth = card.width;
    this.startHeight = card.height;

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
    this.currentImage = (this.currentImage + 1) % this.totalImages;
  }

  prevImage() {
    this.currentImage = (this.currentImage - 1 + this.totalImages) % this.totalImages;
  }
}