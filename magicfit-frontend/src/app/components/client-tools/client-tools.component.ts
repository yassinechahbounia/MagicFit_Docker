// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-client-tools',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './client-tools.component.html',
// })
// export class ClientToolsComponent implements OnInit {
//   client: any = null;

//   constructor(private auth: AuthService) {}

//   ngOnInit() {
//     this.auth.getMe().subscribe({
//       next: (user) => this.client = user,
//       error: () => this.client = null
//     });
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-client-tools',
  templateUrl: './client-tools.component.html',
  styleUrls: ['./client-tools.component.scss'],
  imports: [CommonModule]
})
export class ClientToolsComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: () => {
        const user = localStorage.getItem('user');
        this.user = user ? JSON.parse(user) : null;
      }
    });
  }
}
