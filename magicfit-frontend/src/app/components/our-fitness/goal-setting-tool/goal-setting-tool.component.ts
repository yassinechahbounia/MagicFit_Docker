import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-goal-setting-tool',
  templateUrl: './goal-setting-tool.component.html',
  styleUrls: ['./goal-setting-tool.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class GoalSettingToolComponent {
  objectif = '';
  date = '';
  note = '';
  message = '';
  objectifs: any[] = [];

  constructor() {
    const data = localStorage.getItem('objectifs');
    if (data) {
      this.objectifs = JSON.parse(data);
    }
  }

  ajouterObjectif(): void {
    if (this.objectif && this.date) {
      const obj = { objectif: this.objectif, date: this.date, note: this.note };
      this.objectifs.push(obj);
      localStorage.setItem('objectifs', JSON.stringify(this.objectifs));

      this.message = '✅ Objectif enregistré avec succès!';
      this.objectif = '';
      this.date = '';
      this.note = '';

      setTimeout(() => (this.message = ''), 3000);
    }
  }
}
