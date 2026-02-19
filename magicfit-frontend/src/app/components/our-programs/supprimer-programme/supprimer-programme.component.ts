import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-supprimer-programme',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supprimer-programme.component.html',
  styleUrl: './supprimer-programme.component.scss'
})
export class SupprimerProgrammeComponent {
  programmes: any[] = [];

  constructor(private readonly api: ApiService) {
    this.api.getProgrammes().subscribe({
  next: (res: any[]) => this.programmes = res
});

  }

  supprimer(id: number): void {
    if (!confirm('Confirmer la suppression ?')) return;
    this.api.supprimerProgramme(id).subscribe({
      next: () => {
        this.programmes = this.programmes.filter(p => p.id !== id);
        alert('Supprimé avec succès');
      }
    });
  }
}