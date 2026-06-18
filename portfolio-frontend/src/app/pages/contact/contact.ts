import { Component, OnInit, signal } from '@angular/core';
import { ContactService, ContactContent } from '../../services/contact';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  contactContent = signal<ContactContent | null>(null);

  constructor(private contactService: ContactService) {}

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
}