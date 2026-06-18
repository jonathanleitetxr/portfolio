import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface qui définit la structure d'un projet
// Elle doit correspondre exactement aux champs de l'entité Project côté Spring Boot
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // URL de base de l'API backend Spring Boot
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  // Récupère tous les projets depuis l'API
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}