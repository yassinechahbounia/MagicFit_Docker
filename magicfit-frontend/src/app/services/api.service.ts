import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercice } from '../programme.model';
import { utilisateur } from '../utilisateur.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  
  private baseUrl = environment.apiUrl;
  apiUrl: any;

  constructor(private http: HttpClient) {}

  // ✅ EXERCICES
  getAllExercices(): Observable<Exercice[]> {
  return this.http.get<Exercice[]>(`${this.baseUrl}/exercices`, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  });
}

  getExercices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exercices`, {
      headers: this.getHeaders()
    });
  }

  getExerciceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/exercices/${id}`, {
      headers: this.getHeaders()
    });
  }

  modifierExercice(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/exercices/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  ajouterExercice(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/exercices`, data, {
      headers: this.getHeaders()
    });
  }
  supprimerExercice(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/exercices/${id}`, {
      headers: this.getHeaders()
    });
  }

  // ✅ AJOUT ICI : Récupérer les exercices par muscle
  getExercicesByMuscle(muscle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/exercices?muscle=${muscle}`, {
      headers: this.getHeaders()
    });
  }
// -------------------------------------------------------------------------------------
  // ✅ PROGRAMMES
  getProgrammes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/programmes`, {
    headers: this.getHeaders()
  });
}


  getProgrammeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/programmes/${id}`, {
      headers: this.getHeaders()
    });
  }

  ajouterProgramme(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/programmes`, data, {
      headers: this.getHeaders()
    });
  }

  modifierProgramme(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/programmes/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  supprimerProgramme(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/programmes/${id}`, {
      headers: this.getHeaders()
    });
  }
// ----------------------------------------------------------------------------------------------
  // ✅ UTILISATEURS

// ApiService.ts

getUtilisateurs(): Observable<utilisateur[]> {
  return this.http.get<utilisateur[]>(`${this.baseUrl}/users`);
}
// getUtilisateurs(): Observable<utilisateur[]> {
//     const token = localStorage.getItem('token'); // 🔐 récupère le token
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });
//     return this.http.get<utilisateur[]>(`${this.baseUrl}/users`, { headers });
//   }

getUtilisateurById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/Utilisateurs/${id}`, {
    headers: this.getHeaders()
  });
}
ajouterUtilisateur(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/Utilisateurs`, data, {
    headers: this.getHeaders()
  });
}

modifierUtilisateur(id: number, data: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/Utilisateurs/${id}`, data, {
    headers: this.getHeaders()
  });
}

supprimerUtilisateur(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

  return this.http.delete(`${this.baseUrl}/Utilisateurs/${id}`, { headers });
}

  // ✅ AUTH
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // ✅ HEADERS
  public getHeaders(): any {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json'
    };
  }
}
