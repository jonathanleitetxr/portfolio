import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  displayOrder: number;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}/api/skills`;

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  createSkill(skill: Partial<Skill>): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  updateSkill(id: number, skill: Partial<Skill>): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}