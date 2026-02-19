import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ExerciceService } from 'src/app/services/exercice.service';

@Component({
  selector: 'app-coach',
  standalone: true,
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss'],
  imports: [RouterLink, CommonModule, ], // ✅ Important pour ngIf, ngFor, date pipe
  providers: [DatePipe] // (optionnel, utile si utilisé en TS, pas dans le HTML)
})
export class CoachComponent implements OnInit {
  programmes: any[] = [];
  utilisateurs: any[] = [];
  afficherProgrammesActions = false;
  afficherUtilisateursActions = false;

  constructor(
    private programmeService: ProgrammeService,
    private utilisateurService: UtilisateurService,
    private readonly exerciceService: ExerciceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
//Programmes
  chargerProgrammes(): void {
    const token = localStorage.getItem('token');
    if (!token) return alert('Utilisateur non connecté');

    this.programmeService.getProgrammes().subscribe({
      next: (res) => this.programmes = res,
      error: (err) => {
        console.error('Erreur chargement programmes', err);
        if (err.status === 401) {
          alert("Session expirée. Veuillez vous reconnecter.");
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  supprimerProgramme(id: number): void {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce programme ?")) return;

    this.programmeService.supprimerProgramme(id).subscribe({
      next: () => this.chargerProgrammes(),
      error: () => alert("Erreur lors de la suppression du programme")
    });
  }

  //Utilisateurs

  chargerUtilisateurs(): void {
    const token = localStorage.getItem('token');
    if (!token) return alert('Utilisateur non connecté');

    this.utilisateurService.getUtilisateurs().subscribe({
      next: (res) => this.utilisateurs = res,
      error: (err) => {
        console.error('Erreur chargement utilisateurs', err);
        if (err.status === 401) {
          alert("Session expirée. Veuillez vous reconnecter.");
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  supprimerUtilisateur(id: number): void {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    this.utilisateurService.supprimerUtilisateur(id).subscribe({
      next: () => this.chargerUtilisateurs(),
      error: () => alert("Erreur lors de la suppression de l'utilisateur")
    });
  }


  // Exercices
exercices: any[] = [];
afficherExercicesActions = false;

chargerExercices(): void {
  const token = localStorage.getItem('token');
  if (!token) return alert('Utilisateur non connecté');

  this.exerciceService.getExercices().subscribe({
    next: (res: any[]) => this.exercices = res,
    error: (err: { status: number; }) => {
      console.error('Erreur chargement exercices', err);
      if (err.status === 401) {
        alert("Session expirée. Veuillez vous reconnecter.");
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    }
  });
}


supprimerExercice(id: number): void {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet exercice ?")) return;

  this.exerciceService.supprimerExercice(id).subscribe({
    next: () => this.chargerExercices(),
    error: (err: any) => alert("Erreur lors de la suppression de l'exercice")
  });
}

}
