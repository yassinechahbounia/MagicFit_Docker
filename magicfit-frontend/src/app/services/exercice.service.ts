import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  private apiUrl = `${environment.apiUrl}/exercices`;

  constructor(private http: HttpClient) {}

  getExercices(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json'
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  supprimerExercice(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json'
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  getExerciceById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json'
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  modifierExercice(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json'
    });
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }
}
