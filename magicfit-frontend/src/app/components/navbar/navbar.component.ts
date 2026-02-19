// src/app/components/navbar/navbar.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  user: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  register() {
this.router.navigate(['/register'])}

login() {
this.router.navigate(['/login'])}
  ngOnInit(): void {
    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
