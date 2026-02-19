import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
@Component({
  standalone: true,
  selector: 'app-user-programmes',
  templateUrl: './user-programmes.component.html',
  styleUrls: ['./user-programmes.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class UserProgrammesComponent implements OnInit {
  users: any[] = [];
  selectedUserId: string = '';
  programmes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/users`).subscribe((res) => {
      this.users = res;
    });
  }

  fetchProgrammes() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>(
        `${environment.apiUrl}/api/user-programmes/${this.selectedUserId}`,
        { headers }
      )
      .subscribe((res) => {
        this.programmes = res.programmes;
      });
  }
}
