import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  imports:[ReactiveFormsModule]
})
export class ModifierUtilisateurComponent implements OnInit {
  utilisateurForm: FormGroup;
  utilisateurId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {
    this.utilisateurForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.utilisateurId = +this.route.snapshot.paramMap.get('id')!;
    this.utilisateurService.getUtilisateurById(this.utilisateurId).subscribe(data => {
      this.utilisateurForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.utilisateurForm.invalid) return;

    this.utilisateurService.modifierUtilisateur(this.utilisateurId, this.utilisateurForm.value).subscribe(() => {
      alert('Utilisateur modifié avec succès');
      this.router.navigate(['/coach']);
    });
  }
}
