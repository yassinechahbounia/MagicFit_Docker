import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
 standalone: true,
  selector: 'app-assign-programme',
  templateUrl: './assign-programme.component.html',
  styleUrls: ['./assign-programme.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AssignProgrammeComponent implements OnInit {
  assignForm!: FormGroup;
  users: any[] = [];
  programmes: any[] = [];
  coaches: any[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      user_id: [''],
      programme_id: [''],
      coach_id: ['']
    });

    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('>(`${environment.apiUrl}/api/users').subscribe(data => {
      this.users = data;
      this.coaches = data.filter(u => u.role === 'coach'); // si tu as une colonne "role"
    });

    this.http.get<any[]>('>(`${environment.apiUrl}/api/programmes').subscribe(data => {
      this.programmes = data;
    });
  }

  onSubmit() {
    const token = localStorage.getItem('token'); // récupère ton token d'auth

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('>(`${environment.apiUrl}/api/assign-programme', this.assignForm.value, { headers })
      .subscribe({
        next: (res) => {
          this.successMessage = 'Programme attribué avec succès !';
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Erreur : ' + (err.error?.message || 'Échec');
          this.successMessage = '';
        }
      });
  }
}
