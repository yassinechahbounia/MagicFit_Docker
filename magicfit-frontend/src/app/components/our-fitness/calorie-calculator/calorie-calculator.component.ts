import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calorie-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './calorie-calculator.component.html',
})
export class CalorieCalculatorComponent {
  query = '';
  calorieInfo: any = {};
  showCalorieDetails = false;

  constructor(private http: HttpClient) {}

  getCalorieInfo(): void {
    const headers = new HttpHeaders({
      'X-Api-Key': 'o7U8IjLv92nWaWnSoIn5RQ==3WrZ2WZoRm2B6JAB',
    });

    this.http
      .get(`https://api.calorieninjas.com/v1/nutrition?query=${this.query}`, {
        headers,
      })
      .subscribe((data: any) => {
        this.calorieInfo = data;
        this.showCalorieDetails = true;
      });
  }
}
