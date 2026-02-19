import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  imports:[ReactiveFormsModule]
})
export class AjouterUtilisateurComponent {
  utilisateurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {
    this.utilisateurForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.utilisateurForm.invalid) return;

  this.utilisateurService.ajouterUtilisateur(this.utilisateurForm.value).subscribe({
    next: () => {
      alert('✅ Utilisateur ajouté avec succès');
      this.router.navigate(['/coach']);
    },
    error: (err) => {
      console.error('❌ Erreur lors de l\'ajout :', err);
      if (err.status === 422 && err.error.errors) {
        const messages = Object.values(err.error.errors).flat().join('\n');
        alert('Erreur de validation :\n' + messages);
      } else {
        alert('Erreur inconnue. Veuillez réessayer.');
      }
    }
  });
}
}
