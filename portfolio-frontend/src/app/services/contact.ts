import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactContent {
  id: number;
  email: string;
  phone: string;
  linkedin: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  getContact(): Observable<ContactContent> {
    return this.http.get<ContactContent>(this.apiUrl);
  }
}