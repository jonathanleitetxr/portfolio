import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private apiUrl = 'http://localhost:8080/api/contact-form';

  constructor(private http: HttpClient) {}

  sendMessage(form: ContactFormRequest): Observable<string> {
    return this.http.post(this.apiUrl, form, { responseType: 'text' });
  }
}