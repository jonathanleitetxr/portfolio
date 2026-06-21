import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadResponse {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:8080/api/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(this.apiUrl, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
  
  deleteFile(url: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl, {
        params: { url },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    }
}