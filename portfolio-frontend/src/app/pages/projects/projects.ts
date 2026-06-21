import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project, ProjectSlide } from '../../services/project';
import { UploadService } from '../../services/upload';
import { AuthService } from '../../services/auth';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-projects',
  imports: [FormsModule, ImageCropperComponent, DragDropModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})

export class Projects implements OnInit {

  projects = signal<Project[]>([]);
  selectedProject = signal<Project | null>(null);

  // Modal d'affichage (carrousel public)
  isModalOpen = false;
  isAnimating = false;
  currentImage = 0;

  startTop = 0;
  startLeft = 0;
  startWidth = 0;
  startHeight = 0;

  // Modal de création/édition d'un projet
  isProjectFormOpen = signal<boolean>(false);
  projectFormMode: 'create' | 'edit' = 'create';
  projectEditingId: number | null = null;
  projectForm = { title: '', description: '', technologies: '', imageUrl: '', githubUrl: '', demoUrl: '', featured: false };
  isUploadingProjectImage = false;

  // Modal de création/édition d'une slide
  isSlideFormOpen = signal<boolean>(false);
  slideFormMode: 'create' | 'edit' = 'create';
  slideEditingId: number | null = null;
  slideForm = { imageUrl: '', tag: '', description: '' };
  isUploadingSlideImage = false;

  // Gestion du cropper
  isCropperOpen = signal<boolean>(false);
  imageToCrop: string | null = null;
  croppedImageBlob: Blob | null = null;
  cropperTarget: 'project' | 'slide' = 'project';

  pendingProjectImageFile: File | null = null;
  pendingSlideImageFile: File | null = null;
  pendingSlideOrderChange = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private projectService: ProjectService,
    private uploadService: UploadService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
  this.projectService.getAllProjects().subscribe({
    next: (data) => {
      // Les projets "featured" apparaissent en premier
      const sorted = [...data].sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
      this.projects.set(sorted);
    },
    error: (err) => console.error('Erreur lors de la récupération des projets', err)
  });
}

  hasSlides(project: Project): boolean {
    return project.slides && project.slides.length > 0;
  }

  // --- Modal d'affichage (carrousel) ---

  openModal(event: MouseEvent, project: Project): void {
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

  closeModal(): void {
    this.isAnimating = false;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.isModalOpen = false;
      document.body.style.overflow = '';
      this.cdr.detectChanges();
    }, 350);
  }

  nextImage(): void {
    const total = this.selectedProject()?.slides.length || 1;
    this.currentImage = (this.currentImage + 1) % total;
  }

  prevImage(): void {
    const total = this.selectedProject()?.slides.length || 1;
    this.currentImage = (this.currentImage - 1 + total) % total;
  }

  // --- Gestion des projets ---

  openCreateProjectModal(): void {
    this.projectFormMode = 'create';
    this.projectForm = { title: '', description: '', technologies: '', imageUrl: '', githubUrl: '', demoUrl: '', featured: false };
    this.isProjectFormOpen.set(true);
  }

  openEditProjectModal(project: Project, event: MouseEvent): void {
    event.stopPropagation();
    this.projectFormMode = 'edit';
    this.projectEditingId = project.id;
    this.selectedProject.set(project); // Important : on définit le projet sélectionné pour la gestion des slides
    this.projectForm = {
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      imageUrl: project.imageUrl || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      featured: project.featured
    };
    this.isProjectFormOpen.set(true);
  }

  closeProjectForm(): void {
    this.isProjectFormOpen.set(false);
    this.pendingProjectImageFile = null;
    this.pendingSlideOrderChange = false;
    this.loadProjects(); // Recharge les vraies données pour annuler tout changement local non sauvegardé
  }

  onProjectImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.cropperTarget = 'project';
    this.openCropper(file);
  }

  saveProject(): void {
    if (this.pendingProjectImageFile) {
      // Upload de l'image en attente avant de sauvegarder le projet
      const oldImageUrl = this.projectFormMode === 'edit' 
        ? this.projects().find(p => p.id === this.projectEditingId)?.imageUrl 
        : null;

      this.uploadService.uploadFile(this.pendingProjectImageFile).subscribe({
        next: (response) => {
          this.projectForm.imageUrl = `http://localhost:8080${response.url}`;
          this.pendingProjectImageFile = null;

          if (oldImageUrl && oldImageUrl.includes('/images/')) {
            const relativeUrl = oldImageUrl.replace('http://localhost:8080', '');
            this.uploadService.deleteFile(relativeUrl).subscribe();
          }

          this.doSaveProject();
        },
        error: (err) => console.error('Erreur upload image', err)
      });
    } else {
      this.doSaveProject();
    }
  }

  private doSaveProject(): void {
    const finishSave = () => {
      if (this.projectFormMode === 'create') {
        this.projectService.createProject(this.projectForm).subscribe({
          next: () => {
            this.loadProjects();
            this.isProjectFormOpen.set(false);
          },
          error: (err) => console.error('Erreur création projet', err)
        });
      } else if (this.projectEditingId !== null) {
        this.projectService.updateProject(this.projectEditingId, this.projectForm).subscribe({
          next: () => {
            if (this.pendingSlideOrderChange) {
              this.saveSlideOrder();
            } else {
              this.loadProjects();
            }
            this.isProjectFormOpen.set(false);
          },
          error: (err) => console.error('Erreur modification projet', err)
        });
      }
    };
    finishSave();
  }

  saveSlideOrder(): void {
    const slides = this.selectedProject()?.slides || [];

    if (slides.length === 0) {
      this.loadProjects();
      return;
    }

    this.updateSlideSequentially(slides, 0);
  }

  private updateSlideSequentially(slides: ProjectSlide[], index: number): void {
    if (index >= slides.length) {
      this.pendingSlideOrderChange = false;
      this.loadProjects();
      return;
    }

    const slide = slides[index];
    this.projectService.updateSlide(this.projectEditingId!, slide.id, { ...slide, slideOrder: index }).subscribe({
      next: () => {
        this.updateSlideSequentially(slides, index + 1);
      },
      error: (err) => {
        console.error('Erreur mise à jour ordre slide', err);
        this.updateSlideSequentially(slides, index + 1);
      }
    });
  }

  deleteProject(id: number, event: MouseEvent): void {
    event.stopPropagation();
    if (confirm('Supprimer ce projet ?')) {
      // On retrouve le projet pour récupérer son image et celles de ses slides
      const project = this.projects().find(p => p.id === id);

      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();

          // On supprime l'image principale du projet
          if (project?.imageUrl && project.imageUrl.includes('/images/')) {
            const relativeUrl = project.imageUrl.replace('http://localhost:8080', '');
            this.uploadService.deleteFile(relativeUrl).subscribe();
          }

          // On supprime aussi toutes les images des slides associées
          project?.slides.forEach(slide => {
            if (slide.imageUrl.includes('/images/')) {
              const relativeUrl = slide.imageUrl.replace('http://localhost:8080', '');
              this.uploadService.deleteFile(relativeUrl).subscribe();
            }
          });
        },
        error: (err) => console.error('Erreur suppression projet', err)
      });
    }
  }

  // --- Gestion des slides (depuis la modal d'édition de projet) ---

  openCreateSlideModal(): void {
    this.slideFormMode = 'create';
    this.slideForm = { imageUrl: '', tag: '', description: '' };
    this.isSlideFormOpen.set(true);
  }

  openEditSlideModal(slide: ProjectSlide): void {
    this.slideFormMode = 'edit';
    this.slideEditingId = slide.id;
    this.slideForm = { imageUrl: slide.imageUrl, tag: slide.tag, description: slide.description };
    this.isSlideFormOpen.set(true);
  }

  closeSlideForm(): void {
    this.isSlideFormOpen.set(false);
    this.pendingSlideImageFile = null;
  }

  onSlideImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.cropperTarget = 'slide';
    this.openCropper(file);
  }

  saveSlide(): void {
    if (this.projectEditingId === null) return;

    if (this.pendingSlideImageFile) {
      // Upload de l'image en attente avant de sauvegarder la slide
      const oldImageUrl = this.slideFormMode === 'edit'
        ? this.selectedProject()?.slides.find(s => s.id === this.slideEditingId)?.imageUrl
        : null;

      this.uploadService.uploadFile(this.pendingSlideImageFile).subscribe({
        next: (response) => {
          this.slideForm.imageUrl = `http://localhost:8080${response.url}`;
          this.pendingSlideImageFile = null;

          if (oldImageUrl && oldImageUrl.includes('/images/')) {
            const relativeUrl = oldImageUrl.replace('http://localhost:8080', '');
            this.uploadService.deleteFile(relativeUrl).subscribe();
          }

          this.doSaveSlide();
        },
        error: (err) => console.error('Erreur upload image slide', err)
      });
    } else {
      this.doSaveSlide();
    }
  }

  private doSaveSlide(): void {
    if (this.projectEditingId === null) return;

    if (this.slideFormMode === 'create') {
      const newOrder = this.selectedProject()?.slides.length || 0;
      this.projectService.createSlide(this.projectEditingId, { ...this.slideForm, slideOrder: newOrder }).subscribe({
        next: () => {
          this.refreshSelectedProject();
          this.isSlideFormOpen.set(false);
        },
        error: (err) => console.error('Erreur création slide', err)
      });
    } else if (this.slideEditingId !== null) {
      this.projectService.updateSlide(this.projectEditingId, this.slideEditingId, this.slideForm).subscribe({
        next: () => {
          this.refreshSelectedProject();
          this.isSlideFormOpen.set(false);
        },
        error: (err) => console.error('Erreur modification slide', err)
      });
    }
  }

  refreshSelectedProject(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        if (this.projectEditingId !== null) {
          const updated = data.find(p => p.id === this.projectEditingId);
          if (updated) {
            this.selectedProject.set(updated);
          }
        }
      },
      error: (err) => console.error('Erreur lors du rechargement', err)
    });
  }

  deleteSlide(slideId: number): void {
    if (this.projectEditingId === null) return;
    if (confirm('Supprimer cette slide ?')) {
      // On retrouve la slide pour récupérer son URL d'image avant suppression
      const slide = this.selectedProject()?.slides.find(s => s.id === slideId);

      this.projectService.deleteSlide(this.projectEditingId, slideId).subscribe({
        next: () => {
          this.refreshSelectedProject();
          // On supprime aussi le fichier image associé
          if (slide?.imageUrl && slide.imageUrl.includes('/images/')) {
            const relativeUrl = slide.imageUrl.replace('http://localhost:8080', '');
            this.uploadService.deleteFile(relativeUrl).subscribe();
          }
        },
        error: (err) => console.error('Erreur suppression slide', err)
      });
    }
  }

  openCropper(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageToCrop = reader.result as string;
      this.isCropperOpen.set(true);
    };
    reader.readAsDataURL(file);
  }

  onImageCropped(event: ImageCroppedEvent): void {
    if (event.blob) {
      this.croppedImageBlob = event.blob;
    }
  }

  closeCropper(): void {
    this.isCropperOpen.set(false);
    this.imageToCrop = null;
    this.croppedImageBlob = null;
  }

  confirmCrop(): void {
    if (!this.croppedImageBlob) return;

    const file = new File([this.croppedImageBlob], 'cropped-image.jpg', { type: 'image/jpeg' });

    if (this.cropperTarget === 'project') {
      // On stocke juste le fichier en attente, sans l'uploader tout de suite
      this.pendingProjectImageFile = file;
      // On affiche un aperçu local immédiat (sans upload) grâce à une URL temporaire
      this.projectForm.imageUrl = URL.createObjectURL(file);
    } else {
      this.pendingSlideImageFile = file;
      this.slideForm.imageUrl = URL.createObjectURL(file);
    }

    this.closeCropper();
  }

  onSlideDrop(event: CdkDragDrop<ProjectSlide[] | undefined>): void {
    const list = [...(this.selectedProject()?.slides || [])];
    moveItemInArray(list, event.previousIndex, event.currentIndex);

    const current = this.selectedProject();
    if (current) {
      this.selectedProject.set({ ...current, slides: list });
    }

    // On marque qu'il y a un changement d'ordre en attente, à sauvegarder seulement au clic sur "Enregistrer"
    this.pendingSlideOrderChange = true;
  }

}