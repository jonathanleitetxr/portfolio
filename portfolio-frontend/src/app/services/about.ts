import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
;

export interface AboutContent {
  id: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = `${environment.apiUrl}/api/about`;

  constructor(private http: HttpClient) {}

  getAbout(): Observable<AboutContent> {
    return this.http.get<AboutContent>(this.apiUrl);
  }

  updateAbout(about: AboutContent): Observable<AboutContent> {
    return this.http.put<AboutContent>(this.apiUrl, about, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}