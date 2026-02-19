import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Programme } from 'src/app/programme.model';
import { Exercice } from '../../../exercice.model'; // adapte le chemin si besoin
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modifier-programme',
  templateUrl: './modifier-programme.component.html',
  styleUrls: ['./modifier-programme.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class ModifierProgrammeComponent implements OnInit {
onNutritionInput(event: Event): void {
  const input = (event.target as HTMLInputElement).value;
  const nutritionList = input.split(',').map(item => item.trim()).filter(item => item);
  this.form.patchValue({ nutrition: nutritionList });
}

  form!: FormGroup;
  programmeId!: number;
  exercicesDispo: Exercice[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.programmeId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.programmeId) {
      alert("Aucun ID trouvé");
      this.router.navigate(['/coach']);
      return;
    }

    // Initialisation du formulaire
    this.form = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      objectifs: [''],
      categorie: ['', Validators.required],
      image: [''],
      nutrition: [[]],
      exercices: [[]]
    });

    // Charger le programme
    this.api.getProgrammeById(this.programmeId).subscribe({
      next: (programme: Programme) => this.form.patchValue(programme),
      error: (err) => alert("Erreur chargement programme : " + err.message)
    });

    // Charger les exercices disponibles
    this.api.getAllExercices().subscribe({
      next: (data: Exercice[]) => this.exercicesDispo = data,
      error: () => alert("Erreur chargement des exercices")
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.api.modifierProgramme(this.programmeId, this.form.value).subscribe({
      next: () => {
        alert('✅ Programme modifié avec succès');
        this.router.navigate(['/coach']);
      },
      error: (err) => alert("Erreur modification : " + err.message)
    });
  }

  toggleExercice(id: number): void {
    const selected = this.form.value.exercices || [];
    const index = selected.indexOf(id);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.form.patchValue({ exercices: selected });
  }
}
