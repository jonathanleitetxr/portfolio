import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { HomeService, HomeContent } from '../../services/home';
import { AuthService } from '../../services/auth';
import { UploadService } from '../../services/upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, ImageCropperComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  homeContent = signal<HomeContent | null>(null);

  private clickCount = 0;
  showAdminAccess = signal<boolean>(false);

  isEditModalOpen = signal<boolean>(false);

  editForm = {
    title: '',
    subtitle: '',
    description: '',
    photoUrl: ''
  };

  // Gestion du cropper
  isCropperOpen = signal<boolean>(false);
  imageToCrop: string | null = null;
  croppedImageBlob: Blob | null = null;
  pendingPhotoFile: File | null = null;

  constructor(
    private homeService: HomeService,
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService
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
    this.pendingPhotoFile = null;
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
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
  }

  confirmCrop(): void {
    if (!this.croppedImageBlob) return;

    const file = new File([this.croppedImageBlob], 'photo.jpg', { type: 'image/jpeg' });
    this.pendingPhotoFile = file;
    this.editForm.photoUrl = URL.createObjectURL(file);
    this.closeCropper();
  }

  saveChanges(): void {
    const current = this.homeContent();
    if (!current) return;

    if (this.pendingPhotoFile) {
      const oldPhotoUrl = current.photoUrl;

      this.uploadService.uploadFile(this.pendingPhotoFile).subscribe({
        next: (response) => {
          this.editForm.photoUrl = `${environment.apiUrl}${response.url}`;
          this.pendingPhotoFile = null;

          if (oldPhotoUrl && oldPhotoUrl.includes('/images/')) {
            this.uploadService.deleteFile(oldPhotoUrl).subscribe();
          }

          this.doSaveChanges();
        },
        error: (err) => console.error('Erreur upload photo', err)
      });
    } else {
      this.doSaveChanges();
    }
  }

  private doSaveChanges(): void {
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