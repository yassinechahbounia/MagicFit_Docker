import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-coach-users',
  templateUrl: './coach-users.component.html'
})
export class CoachUsersComponent implements OnInit {
  allUsers: any[] = [];
  programmes: any[] = [];
  selectedUserId!: number;
  selectedProgrammeId!: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = this.getHeaders();

    // Récupérer tous les utilisateurs
    this.http.get<any[]>('`${environment.apiUrl}/api/users', { headers })
      .subscribe(users => this.allUsers = users);

    // Récupérer tous les programmes
    this.http.get<any[]>('`${environment.apiUrl}/api/programmes', { headers })
      .subscribe(programmes => this.programmes = programmes);
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  assignUser(): void {
    const headers = this.getHeaders();
    const url = `${environment.apiUrl}/api/coach/programmes/${this.selectedProgrammeId}/assign`;

    this.http.post(url, { user_id: this.selectedUserId }, { headers })
      .subscribe({
        next: () => alert('Utilisateur assigné au programme.'),
        error: err => alert(`Erreur assignation: ${err.error?.message || err.message}`)
      });
  }

  unassignUser(): void {
    const headers = this.getHeaders();
    const url = `${environment.apiUrl}/api/coach/programmes/${this.selectedProgrammeId}/unassign/${this.selectedUserId}`;

    this.http.delete(url, { headers })
      .subscribe({
        next: () => alert('Utilisateur désassigné du programme.'),
        error: err => alert(`Erreur désassignation: ${err.error?.message || err.message}`)
      });
  }
}
