import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {
  private apiUrl = `${environment.apiUrl}/programmes`; // ou http://127.0.0.1:8000/api/programmes

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🔹 Lister tous les programmes
  getProgrammes(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // 🔹 Récupérer un programme par ID
  getProgrammeById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`, {

    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json'
    }
  });
}

  // 🔹 Ajouter un nouveau programme
  ajouterProgramme(programme: any): Observable<any> {
    return this.http.post(this.apiUrl, programme, { headers: this.getHeaders() });
  }

  // 🔹 Modifier un programme existant
  modifierProgramme(id: number, programme: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, programme, { headers: this.getHeaders() });
  }

  // 🔹 Supprimer un programme
  supprimerProgramme(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
