import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
;

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
  private apiUrl = `${environment.apiUrl}/api/contact-form`;

  constructor(private http: HttpClient) {}

  sendMessage(form: ContactFormRequest): Observable<string> {
    return this.http.post(this.apiUrl, form, { responseType: 'text' });
  }
}