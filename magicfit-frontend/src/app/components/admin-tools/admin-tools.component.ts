// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-admin-tools',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './admin-tools.component.html',
// })
// export class AdminToolsComponent implements OnInit {
//   admin: any = null;

//   constructor(private auth: AuthService) {}

//   ngOnInit() {
//     this.auth.getMe().subscribe({
//       next: (user) => this.admin = user,
//       error: () => this.admin = null
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-tools.component.html',
})
export class AdminToolsComponent implements OnInit {
  user: any = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getMe().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: () => {
        const local = localStorage.getItem('user');
        if (local) this.user = JSON.parse(local);
      }
    });
  }
}
