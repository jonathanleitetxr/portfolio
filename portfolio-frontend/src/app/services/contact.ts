import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
;

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
  private apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) {}

  getContact(): Observable<ContactContent> {
    return this.http.get<ContactContent>(this.apiUrl);
  }

  updateContact(contact: ContactContent): Observable<ContactContent> {
    return this.http.put<ContactContent>(this.apiUrl, contact, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}