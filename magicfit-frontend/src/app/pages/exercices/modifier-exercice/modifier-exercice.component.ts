// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ApiService } from 'src/app/services/api.service';

// @Component({
//   selector: 'app-modifier-exercice',
//   standalone: true,
//   templateUrl: './modifier-exercice.component.html',
//   styleUrls: ['./modifier-exercice.component.scss'],
//   imports: [CommonModule, ReactiveFormsModule],
// })
// export class ModifierExerciceComponent implements OnInit {
//   form: FormGroup;
//   exerciceId!: number;
//   programmes: any[] = [];

//   constructor(
//     private readonly route: ActivatedRoute,
//     private readonly router: Router,
//     private readonly fb: FormBuilder,
//     private readonly api: ApiService
//   ) {
//     this.form = this.fb.group({
//       nom: ['', Validators.required],
//       description: [''],
//       image: [''],
//       muscle: ['', Validators.required],
//       programme_id: ['', Validators.required] // Ajouté ici
//     });
//   }

//   ngOnInit(): void {
//     this.exerciceId = Number(this.route.snapshot.paramMap.get('id'));

//     // Charger tous les programmes
//     this.api.getProgrammes().subscribe({
//       next: (data: any[]) => this.programmes = data,
//       error: () => alert("Erreur chargement des programmes")
//     });

//     this.chargerExercice();
//   }

//   chargerExercice(): void {
//     this.api.getExerciceById(this.exerciceId).subscribe({
//       next: (exercice) => this.form.patchValue(exercice),
//       error: () => alert("Erreur de chargement de l'exercice")
//     });
//   }

//   onSubmit(): void {
//     if (this.form.invalid) return;

//     this.api.updateExercice(this.exerciceId, this.form.value).subscribe({
//       next: () => {
//         alert("Exercice modifié !");
//         this.router.navigate(['/exercices']);
//       },
//       error: () => alert("Erreur lors de la modification de l'exercice")
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Programme } from 'src/app/programme.model';

@Component({
  selector: 'app-modifier-exercice',
  standalone: true,
  templateUrl: './modifier-exercice.component.html',
  styleUrls: ['./modifier-exercice.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ModifierExerciceComponent implements OnInit {
  form: FormGroup;
  exerciceId!: number;
  programmes: Programme[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly api: ApiService
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      image: [''],
      muscle: ['', Validators.required],
      programme_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.exerciceId = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getProgrammes().subscribe({
      next: (data: Programme[]) => this.programmes = data,
      error: () => alert("Erreur chargement des programmes")
    });

    this.chargerExercice();
  }

  chargerExercice(): void {
    this.api.getExerciceById(this.exerciceId).subscribe({
      next: (exercice) => this.form.patchValue(exercice),
      error: () => alert("Erreur de chargement de l'exercice")
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.api.modifierExercice(this.exerciceId, this.form.value).subscribe({
      next: () => {
        alert("Exercice modifié !");
        this.router.navigate(['/exercices']);
      },
      error: () => alert("Erreur lors de la modification de l'exercice")
    });
  }
}
