import { CommonModule } from '@angular/common';
import { Component as Component2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component2({
  standalone: true,
  selector: 'app-macronutrient-calculator',
  templateUrl: 'macronutrient-calculator.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class MacronutrientCalculatorComponent {
  calories!: number;
  macros: any;

  calculateMacros() {
    this.macros = {
      carbs: Math.round((this.calories * 0.5) / 4),
      proteins: Math.round((this.calories * 0.2) / 4),
      fats: Math.round((this.calories * 0.3) / 9)
    };
  }
}
