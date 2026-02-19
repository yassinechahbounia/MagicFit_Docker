import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  imports: [CommonModule, FormsModule]
})
export class BmiCalculatorComponent {
  weight!: number;
  height!: number;
  bmi!: number;

  calculateBMI() {
    if (this.weight && this.height) {
      this.bmi = this.weight / ((this.height / 100) ** 2);
    }
  }
}
