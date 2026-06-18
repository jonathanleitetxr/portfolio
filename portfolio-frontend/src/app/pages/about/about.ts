import { Component, OnInit, signal } from '@angular/core';
import { AboutService, AboutContent } from '../../services/about';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  aboutContent = signal<AboutContent | null>(null);

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.aboutContent.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du contenu about', err);
      }
    });
  }
}