import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ajouter-exercice',
  templateUrl: './ajouter-exercice.component.html',
  styleUrls: ['./ajouter-exercice.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AjouterExerciceComponent implements OnInit {
  form: FormGroup;
programmes: any;

  constructor(private readonly fb: FormBuilder,private readonly  api: ApiService, private router: Router) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      muscle: ['', Validators.required],
      image: [''],
      programme_id: ['', Validators.required] 
    });
  }
  ngOnInit(): void {
    this.api.getProgrammes().subscribe({
    next: (data) => this.programmes = data,
    error: () => alert("Erreur chargement des programmes")
  });
  }

  onSubmit():void {
    if (this.form.invalid) return;
    this.api.ajouterExercice(this.form.value).subscribe({
      next: () => {
        alert('Exercice ajouté avec succès');
        this.router.navigate(['/exercices']);
      },
      error: () => alert('Erreur lors de l\'ajout')
    });
  }
}
