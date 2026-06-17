import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  isModalOpen = false;
  isAnimating = false;
  currentImage = 0;
  totalImages = 4;
  images = [0, 1, 2, 3];

  startTop = 0;
  startLeft = 0;
  startWidth = 0;
  startHeight = 0;

  slides = [
    { tag: 'Kanban & Drag and Drop', description: "Développement d'un système de drag & drop permettant de changer le statut des projets de manière intuitive. Chaque projet dispose d'un pourcentage d'avancement. En m'appuyant sur les fonctionnalités existantes de CAutomatique et des recherches personnelles, j'ai pu réaliser cette fonctionnalité efficacement." },
    { tag: 'Module de commentaires', description: "Intégration du module de commentaires existant de CAutomatique et CsmArt, principalement conçu en PHP. J'ai dû adapter ce module à mes besoins tant au niveau des fonctionnalités que du design, ce qui a représenté un défi technique important." },
    { tag: 'Budget & Badgeage', description: "Développement des fonctionnalités les plus complexes du projet. Le module budget calcule automatiquement la somme des badgeages en jours pour comparer le budget consommé au budget prévu. Le module badgeage permet à chaque utilisateur de saisir ses activités jour par jour avec un défilement par semaine." },
    { tag: 'Pilotage & ARM', description: "Développement de l'ARM (Analyse Risque Métier) permettant de décider si un projet passe en développement. Création d'un tableau avec DataTable générant automatiquement des exports Excel et PDF. Ajout d'une fonctionnalité d'affichage du total des heures par utilisateur avec détail au survol." }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

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