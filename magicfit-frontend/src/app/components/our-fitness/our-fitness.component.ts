import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-our-fitness',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './our-fitness.component.html',
  styleUrl: './our-fitness.component.scss'
})
export class OurFitnessComponent {
  calorieInfo: any = null;
  showCalorieDetails = false;
  query: string = '';

  constructor(private http: HttpClient) {}

  getCalorieInfo() {
    if (!this.query.trim()) return;

    const headers = new HttpHeaders({
      'X-Api-Key': 'o7U8IjLv92nWaWnSoIn5RQ==3WrZ2WZoRm2B6JAB'
    });

    this.http
      .get(`https://api.calorieninjas.com/v1/nutrition?query=${this.query}`, { headers })
      .subscribe({
        next: (data) => {
          this.calorieInfo = data;
          this.showCalorieDetails = true;
        },
        error: (err) => console.error('Erreur API CalorieNinjas :', err)
      });
  }
}
