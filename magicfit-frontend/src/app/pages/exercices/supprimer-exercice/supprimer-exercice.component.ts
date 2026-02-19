import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-supprimer-exercice',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supprimer-exercice.component.html',
  styleUrl: './supprimer-exercice.component.scss'
})
export class SupprimerexerciceComponent {
  exercices: any[] = [];

  constructor(private readonly api: ApiService) {
    this.api.getExercices().subscribe({
      next: (res) => this.exercices = res
    });
  }

  supprimer(id: number): void {
    if (!confirm('Confirmer la suppression ?')) return;
    this.api.supprimerExercice(id).subscribe({
      next: () => {
        this.exercices = this.exercices.filter(p => p.id !== id);
        alert('Supprimé avec succès');
      }
    });
  }
}
