import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { OurProgramsComponent } from '../../components/our-programs/our-programs.component';
import { OurFitnessComponent } from '../../components/our-fitness/our-fitness.component';
import { LoginComponent } from '../../modals/login/login.component';
import { RegisterComponent } from '../../modals/register/register.component';
import { AdminToolsComponent } from '../../components/admin-tools/admin-tools.component';
import { ExerciseListComponent } from '../exercices/exercise-list/exercise-list.component';
import { InteractiveMapComponent } from '../../components/interactive-map/interactive-map.component';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from 'express';
import { FooterComponent } from "../../shared/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    OurProgramsComponent,
    OurFitnessComponent,
    // AdminToolsComponent,
    // ExerciseListComponent,
    InteractiveMapComponent,
    // FooterComponent,
    RouterModule
]
})
export class HomeComponent implements OnInit {
  userRole: string = '';
  selectedMuscle: string = '';

  constructor(private readonly auth: AuthService) {}
  ngOnInit() {
    this.auth.getMe().subscribe({
      next: (user: any) => {
        console.log('Utilisateur connecté', user);
        this.userRole = user.role;
      },
      error: () => {
        console.warn('Non authentifié');
        const user = localStorage.getItem('user');
        if (user) {
          this.userRole = JSON.parse(user).role;
        }
      }
    });
  }

  onMuscleSelected(muscle: string) {
    this.selectedMuscle = muscle;
  }
}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { NavbarComponent } from '../../components/navbar/navbar.component';
// import { HeroComponent } from '../../components/hero/hero.component';
// import { OurProgramsComponent } from '../../components/our-programs/our-programs.component';
// import { OurFitnessComponent } from '../../components/our-fitness/our-fitness.component';
// import { AdminToolsComponent } from '../../components/admin-tools/admin-tools.component';
// import { ExerciseListComponent } from '../exercices/exercise-list/exercise-list.component';
// import { InteractiveMapComponent } from '../../components/interactive-map/interactive-map.component';
// import { FooterComponent } from '../../shared/footer/footer.component';

// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   standalone: true,
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   imports: [
//     CommonModule,
//     NavbarComponent,
//     HeroComponent,
//     OurProgramsComponent,
//     OurFitnessComponent,
//     AdminToolsComponent,
//     ExerciseListComponent,
//     InteractiveMapComponent,
//     FooterComponent,
//   ],
// })
// export class HomeComponent implements OnInit {
//   userRole: string = '';
//   selectedMuscle: string = '';

//   constructor(private readonly auth: AuthService) {}

//   ngOnInit() {
//     this.auth.getMe().subscribe({
//       next: (user: any) => {
//         console.log('Utilisateur connecté', user);
//         this.userRole = user.role;
//       },
//       error: () => {
//         console.warn('Non authentifié');
//         const user = localStorage.getItem('user');
//         if (user) {
//           this.userRole = JSON.parse(user).role;
//         }
//       },
//     });
//   }

//   onMuscleSelected(muscle: string) {
//     this.selectedMuscle = muscle;
//   }
// }
