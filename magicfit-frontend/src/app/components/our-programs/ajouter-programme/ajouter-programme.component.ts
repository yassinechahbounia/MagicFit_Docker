import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ajouter-programme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-programme.component.html',
  styleUrls: ['./ajouter-programme.component.scss']
})
export class AjouterProgrammeComponent implements OnInit {
  form!: FormGroup;
  exercicesDisponibles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      categorie: ['', Validators.required],
      action: [''],
      exercices: [[]] // tableau d’ID d’exercices sélectionnés
    });

    this.api.getExercices().subscribe({
      next: (res) => this.exercicesDisponibles = res,
      error: () => alert("Erreur de chargement des exercices")
    });
  }

  onCheckboxChange(event: any): void {
    const selectedExercices: number[] = this.form.value.exercices || [];

    if (event.target.checked) {
      selectedExercices.push(+event.target.value);
    } else {
      const index = selectedExercices.indexOf(+event.target.value);
      if (index > -1) {
        selectedExercices.splice(index, 1);
      }
    }

    this.form.patchValue({ exercices: selectedExercices });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }

    this.api.ajouterProgramme(this.form.value).subscribe({
      next: () => {
        alert('✅ Programme ajouté avec succès !');
        this.router.navigate(['/programmes']);
      },
      error: (err) => {
        console.error('Erreur API :', err);
        if (err.status === 401) {
          alert('Non autorisé. Veuillez vous reconnecter.');
        } else if (err.status === 422) {
          alert('Champs invalides. Vérifiez le formulaire.');
        } else {
          alert('Une erreur est survenue.');
        }
      }
    });
  }
}
