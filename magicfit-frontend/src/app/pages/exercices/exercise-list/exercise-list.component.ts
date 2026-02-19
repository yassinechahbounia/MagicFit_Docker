import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ExerciseService } from 'src/app/services/exercise.service';

interface Programme {
  id: number;
  nom: string;
}

interface Exercice {
  name: string;
  gif: string;
  programme?: Programme;
}

@Component({
  standalone: true,
  selector: 'app-exercise-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent implements OnChanges {
  @Input() muscle = '';
  exercises: Exercice[] = [];

  constructor(private api: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['muscle'] && this.muscle) {
      this.api.getExercicesByMuscle(this.muscle).subscribe({
        next: (data: any[]) => {
          this.exercises = data.map(ex => ({
            name: ex.nom,
            gif: ex.gif_path,
            programme: ex.programme // sera undefined si non chargé côté backend
          }));
        },
        error: () => alert("Erreur lors du chargement des exercices")
      });
    }
  }
}
