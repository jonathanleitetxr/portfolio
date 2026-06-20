import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  displayOrder: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'http://localhost:8080/api/experiences';

  constructor(private http: HttpClient) {}

  getAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  createExperience(experience: Partial<Experience>): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, experience, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  updateExperience(id: number, experience: Partial<Experience>): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, experience, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}