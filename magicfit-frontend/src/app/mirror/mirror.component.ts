import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { environment } from 'environments/environment';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mirror',
  imports: [CommonModule],
  templateUrl: './mirror.component.html',
  styleUrl: './mirror.component.scss'
})
export class MirrorComponent implements OnInit {
  isMirrorLoaded = false;
  mirrorError: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkMirrorStatus();
  }

  checkMirrorStatus() {
    // Vérifier si MagicMirror répond
    this.http.get('http://localhost:8081', { responseType: 'text' })
      .subscribe({
        next: () => {
          this.isMirrorLoaded = true;
          this.mirrorError = null;
        },
        error: (error) => {
          this.isMirrorLoaded = false;
          this.mirrorError = 'Impossible de contacter MagicMirror. Vérifiez qu\'il est démarré.';
          console.error('Erreur de connexion au miroir:', error);
        }
      });
  }

  onMirrorLoad() {
    this.isMirrorLoaded = true;
    this.mirrorError = null;
  }

  onMirrorError() {
    this.isMirrorLoaded = false;
    this.mirrorError = 'Erreur lors du chargement du miroir.';
  }

  refreshMirror() {
    this.isMirrorLoaded = false;
    this.mirrorError = null;
    // Forcer le rechargement de l'iframe
    setTimeout(() => {
      this.checkMirrorStatus();
    }, 1000);
  }

  cacher() {
    this.http.get(`${environment.apiUrl}/api/mirror/cacher-horloge`).subscribe({
      next: () => console.log('Horloge cachée'),
      error: (error) => console.error('Erreur lors du masquage de l\'horloge:', error)
    });
  }

  afficher() {
    this.http.get('`${environment.apiUrl}/api/mirror/afficher-horloge').subscribe({
      next: () => console.log('Horloge affichée'),
      error: (error) => console.error('Erreur lors de l\'affichage de l\'horloge:', error)
    });
  }
}
