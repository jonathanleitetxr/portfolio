import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProjectSlide {
  id: number;
  imageUrl: string;
  tag: string;
  description: string;
  slideOrder: number;
}

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

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/api/projects`;

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  // --- Gestion des slides ---

  createSlide(projectId: number, slide: Partial<ProjectSlide>): Observable<ProjectSlide> {
    return this.http.post<ProjectSlide>(`${this.apiUrl}/${projectId}/slides`, slide, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  updateSlide(projectId: number, slideId: number, slide: Partial<ProjectSlide>): Observable<ProjectSlide> {
    return this.http.put<ProjectSlide>(`${this.apiUrl}/${projectId}/slides/${slideId}`, slide, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteSlide(projectId: number, slideId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/slides/${slideId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}