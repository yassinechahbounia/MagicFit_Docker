import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUser(): any {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // login(credentials: { email: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

login(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    tap((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    })
  );
}



  // register(data: { name: string, email: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }
  register(data: any) {
  return this.http.post(`${this.apiUrl}/register`, data);
}

  getMe(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/me`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return of(true); // maintenant ça retourne un Observable
  }

  isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  return !!token; // true si token présent
}
}
