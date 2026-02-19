// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-coach-tools',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './coach-tools.component.html',
// })
// export class CoachToolsComponent implements OnInit {
//   coach: any = null;

//   constructor(private auth: AuthService) {}

//   ngOnInit() {
//     this.auth.getMe().subscribe({
//       next: (user) => this.coach = user,
//       error: () => this.coach = null
//     });
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-coach-tools',
  templateUrl: './coach-tools.component.html',
  styleUrls: ['./coach-tools.component.scss']
})
export class CoachToolsComponent implements OnInit {
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
