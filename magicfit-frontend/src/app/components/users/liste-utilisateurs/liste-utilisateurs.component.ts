import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './liste-utilisateurs.component.html'
})
export class ListeUtilisateursComponent implements OnInit {
  utilisateurs: any[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.api.getUtilisateurs().subscribe({
      next: (data: any[]) => this.utilisateurs = data,
      error: () => alert('Erreur lors du chargement')
    });
  }

  supprimer(id: number): void {
    if (!confirm('Supprimer cet utilisateur ?')) return;

    this.api.supprimerUtilisateur(id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
        alert('Utilisateur supprimé avec succès');
      },
      error: () => alert('Erreur lors de la suppression')
    });
  }
}
