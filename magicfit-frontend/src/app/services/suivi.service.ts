// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';


// @Injectable({ providedIn: 'root' })
// export class SuiviService {
//   private baseUrl = 'http://127.0.0.1:8000/api/suivis';

//   constructor(private http: HttpClient) {}

//   getSuivis(): Observable<any> {
//     return this.http.get(this.baseUrl, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//         Accept: 'application/json'
//       }
//     });
//   }

//   ajouterSuivi(data: any): Observable<any> {
//     return this.http.post(this.baseUrl, data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//         Accept: 'application/json'
//       }
//     });
//   }

//   supprimerSuivi(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//         Accept: 'application/json'
//       }
//     });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {
  private apiUrl = `${environment.apiUrl}/suivis`;
  constructor(private http: HttpClient) {}

  getSuivis(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  ajouterSuivi(suivi: any): Observable<any> {
    return this.http.post(this.apiUrl, suivi);
  }

  supprimerSuivi(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
