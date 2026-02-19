import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class ProgrammesComponent implements OnInit {
  programmes: any[] = [];
  staticPrograms = [
    {
      id: 1,
      title: 'LOSING WEIGHT',
      description: 'Effective training and coaching to help you burn fat and get in shape.',
      icon: 'weights.png'
    },
    {
      id: 2,
      title: 'BUILDING MUSCLE',
      description: 'Structured plans designed for hypertrophy and muscle growth.',
      icon: 'diet.png'
    },
    {
      id: 3,
      title: 'TRAINING AT HOME',
      description: 'No gym? No problem. Workout programs for your living room.',
      icon: 'home.png'
    },
    {
      id: 4,
      title: 'GYM PLAN',
      description: 'Advanced and personalized plans for gym-goers of all levels.',
      icon: 'gym.png'
    }
  ];

  afficherTous = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProgrammes();
  }

  getProgrammes(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("❌ Aucun token trouvé. L'utilisateur n'est pas authentifié.");
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    this.http.get<any[]>(`${environment.apiUrl}/api/programmes`, { headers }).subscribe({
      next: (data) => {
        this.programmes = data;
        console.log("✅ Programmes chargés :", data);
      },
      error: (err) => {
        console.error('❌ Erreur API:', err);
        if (err.status === 401) {
          alert("Session expirée. Veuillez vous reconnecter.");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    });
  }

  afficherTousLesProgrammes(): void {
    this.afficherTous = true;

    // Scroll vers la section "Available Programs"
    setTimeout(() => {
      const el = document.getElementById("available");
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  masquerProgrammes(): void {
    this.afficherTous = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
