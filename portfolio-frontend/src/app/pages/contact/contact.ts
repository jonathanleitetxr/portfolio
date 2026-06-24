import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactContent } from '../../services/contact';
import { ContactFormService, ContactFormRequest } from '../../services/contact-form';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  contactContent = signal<ContactContent | null>(null);

  isEditModalOpen = signal<boolean>(false);
editForm = { email: '', phone: '', linkedin: '', github: '' };

  // Formulaire de contact public
  contactForm: ContactFormRequest = { name: '', email: '', subject: '', message: '' };
  isSending = signal<boolean>(false);
  sendSuccess = signal<boolean>(false);
  sendError = signal<boolean>(false);

  constructor(
    private contactService: ContactService,
    private contactFormService: ContactFormService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.contactService.getContact().subscribe({
      next: (data) => {
        this.contactContent.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du contenu contact', err);
      }
    });
  }

  openEditModal(): void {
    const current = this.contactContent();
    if (current) {
      this.editForm = {
        email: current.email,
        phone: current.phone,
        linkedin: current.linkedin,
        github: current.github  
      };
    }
    this.isEditModalOpen.set(true);
  }

  closeEditModal(): void {
    this.isEditModalOpen.set(false);
  }

  saveChanges(): void {
    const current = this.contactContent();
    if (!current) return;

    const updated: ContactContent = {
      id: current.id,
      email: this.editForm.email,
      phone: this.editForm.phone,
      linkedin: this.editForm.linkedin,
      github: this.editForm.github
    };

    this.contactService.updateContact(updated).subscribe({
      next: (data) => {
        this.contactContent.set(data);
        this.isEditModalOpen.set(false);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
      }
    });
  }

  // --- Envoi du formulaire de contact public ---

  sendContactForm(): void {
    this.isSending.set(true);
    this.sendSuccess.set(false);
    this.sendError.set(false);

    this.contactFormService.sendMessage(this.contactForm).subscribe({
      next: () => {
        this.isSending.set(false);
        this.sendSuccess.set(true);
        this.contactForm = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        console.error('Erreur envoi message', err);
        this.isSending.set(false);
        this.sendError.set(true);
      }
    });
  }
}