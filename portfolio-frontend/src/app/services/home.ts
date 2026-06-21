import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface HomeContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  photoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/api/home`;

  constructor(private http: HttpClient) {}

  getHome(): Observable<HomeContent> {
    return this.http.get<HomeContent>(this.apiUrl);
  }

  updateHome(home: HomeContent): Observable<HomeContent> {
  return this.http.put<HomeContent>(this.apiUrl, home, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}
}

