import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  slides: ProjectSlide[];
}

// Nouvelle interface pour les slides d'un projet
export interface ProjectSlide {
  id: number;
  imageUrl: string;
  tag: string;
  description: string;
  slideOrder: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}