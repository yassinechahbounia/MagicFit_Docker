import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
//import { environment } from 'environments/environment';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-coach-virtuel',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './coach-virtuel.component.html',
  styleUrls: ['./coach-virtuel.component.scss'],
})
export class CoachVirtuelComponent {
  question = '';
  reponse = '';
  loading = false;
  error = '';
  historique: any[] = [];

  constructor(private http: HttpClient) {}

  poserQuestion() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.error = 'Utilisateur non authentifié.';
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    this.loading = true;
    this.error = '';
    this.reponse = '';

    this.http.post<any>(
      `${environment.apiUrl}/api/coach-virtuel`,
      {
        question: this.question,
        historique: this.historique || [],
      },
      { headers }
    ).subscribe({
      next: (res) => {
        const reponseIA = res.reponse || 'Pas de réponse reçue.';
        this.historique.push({ role: 'user', content: this.question });
        this.historique.push({ role: 'assistant', content: reponseIA });
        this.reponse = reponseIA;
        this.question = '';
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'Erreur 401 : Utilisateur non authentifié.';
        } else {
          this.error = err?.error?.message || 'Erreur inconnue';
        }
        this.loading = false;
      }
    });
  }

  viderChat() {
    this.historique = [];
    this.reponse = '';
    this.error = '';
  }

  supprimerReponse(index: number) {
    this.historique.splice(index, 1);
  }

  modifierReponse(index: number) {
    const nouveauTexte = prompt('Modifier le message :', this.historique[index].content);
    if (nouveauTexte !== null) {
      this.historique[index].content = nouveauTexte;
    }
  }
}
