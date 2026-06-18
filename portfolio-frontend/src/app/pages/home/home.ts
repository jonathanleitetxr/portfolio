import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService, HomeContent } from '../../services/home';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  homeContent = signal<HomeContent | null>(null);

  constructor(private homeService: HomeService) {}

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
}