import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
Chart.register(...registerables);

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class SuiviComponent implements OnInit {
  suiviForm: FormGroup;
  suivis: any[] = [];
  utilisateurs: any[] = [];
  userIdFilter: number | null = null;
  chart: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.suiviForm = this.fb.group({
      user_id: ['', Validators.required],
      date: ['', Validators.required],
      poids: [''],
      repetitions: [''],
      calories: [''],
      battement_heart_rate: [''],
      distance: [''],
      steps: [''],
      sommeil: [''],
      commentaire: [''],
    });
  }

  ngOnInit(): void {
    this.getUtilisateurs();
    this.getSuivis();
  }

  getUtilisateurs(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>(`${environment.apiUrl}/api/users`, { headers }).subscribe(data => {
      this.utilisateurs = data;
    });
  }

  getSuivis(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>(`${environment.apiUrl}/api/suivis`, { headers }).subscribe(data => {
      this.suivis = data;
      this.updateChart();
    });
  }

  ajouterSuivi(): void {
    if (this.suiviForm.invalid) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http
      .post(`${environment.apiUrl}/api/suivis`, this.suiviForm.value, { headers })
      .subscribe(() => {
        this.suiviForm.reset();
        this.getSuivis();
      });
  }

  supprimerSuivi(id: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http
      .delete(`${environment.apiUrl}/api/suivis/${id}`, { headers })
      .subscribe(() => {
        this.getSuivis();
      });
  }

  get filteredSuivis(): any[] {
    if (!this.userIdFilter) return this.suivis;
    return this.suivis.filter((s) => s.user_id == this.userIdFilter);
  }

  updateChart(): void {
    if (this.chart) this.chart.destroy();

    const userId = this.userIdFilter;
    const filtered = userId
      ? this.suivis.filter((s) => s.user_id == userId)
      : this.suivis;

    const sorted = [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const labels = sorted.map((s) => s.date);
    const poidsData = sorted.map((s) => s.poids);
    const heartRateData = sorted.map((s) => s.battement_heart_rate);
    const caloriesData = sorted.map((s) => s.calories);

    this.chart = new Chart('suiviChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Poids (kg)',
            data: poidsData,
            borderColor: 'blue',
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'BPM',
            data: heartRateData,
            borderColor: 'red',
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'Calories',
            data: caloriesData,
            borderColor: 'orange',
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
        },
      },
    });
  }
}
