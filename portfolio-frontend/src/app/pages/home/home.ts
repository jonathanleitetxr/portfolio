import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService, HomeContent } from '../../services/home';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  homeContent = signal<HomeContent | null>(null);

  private clickCount = 0;
  showAdminAccess = signal<boolean>(false);

  // Nouveau : état de la modal d'édition
  isEditModalOpen = signal<boolean>(false);

  // Copie temporaire des données pendant l'édition (pour ne pas modifier l'original avant de valider)
  editForm = {
    title: '',
    subtitle: '',
    description: '',
    photoUrl: ''
  };

  constructor(
    private homeService: HomeService,
    public authService: AuthService  // public pour pouvoir l'utiliser directement dans le HTML
  ) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: (data) => {
        this.homeContent.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du contenu home', err);
      }
    });
  }

  onPhotoClick(): void {
      // Si déjà connecté, pas besoin du système de clics caché
      if (this.authService.isLoggedIn()) {
        return;
      }

      this.clickCount++;
      if (this.clickCount >= 5) {
        this.showAdminAccess.set(true);
      }
    }

  openEditModal(): void {
    const current = this.homeContent();
    if (current) {
      // On pré-remplit le formulaire avec les valeurs actuelles
      this.editForm = {
        title: current.title,
        subtitle: current.subtitle,
        description: current.description,
        photoUrl: current.photoUrl
      };
    }
    this.isEditModalOpen.set(true);
  }

  closeEditModal(): void {
    this.isEditModalOpen.set(false);
  }

  saveChanges(): void {
    const current = this.homeContent();
    if (!current) return;

    const updated: HomeContent = {
      id: current.id,
      title: this.editForm.title,
      subtitle: this.editForm.subtitle,
      description: this.editForm.description,
      photoUrl: this.editForm.photoUrl
    };

    this.homeService.updateHome(updated).subscribe({
      next: (data) => {
        this.homeContent.set(data);
        this.isEditModalOpen.set(false);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
      }
    });
  }
}