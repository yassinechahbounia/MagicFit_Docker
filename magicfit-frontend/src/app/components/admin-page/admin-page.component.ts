import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AdminToolsComponent } from 'src/app/components/admin-tools/admin-tools.component';
import { CoachToolsComponent } from 'src/app/components/coach-tools/coach-tools.component';
import { ClientToolsComponent } from 'src/app/components/client-tools/client-tools.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, AdminToolsComponent, CoachToolsComponent, ClientToolsComponent],
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {
  role: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getMe().subscribe({
      next: (user) => {
        this.role = user.role;
      },
      error: () => {
        const user = localStorage.getItem('user');
        if (user) {
          this.role = JSON.parse(user).role;
        }
      }
    });
  }
}
