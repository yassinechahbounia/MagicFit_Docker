import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './modals/login/login.component';
import { RegisterComponent } from './modals/register/register.component';
import { CoachComponent } from './pages/coach/coach.component';
import { AdminToolsComponent } from './components/admin-tools/admin-tools.component';
import { RoleGuard } from './guards/role.guard';
import { MembershipComponent } from './components/admin-tools/membership/membership.component';

import { AjouterProgrammeComponent } from './components/our-programs/ajouter-programme/ajouter-programme.component';
import { SupprimerProgrammeComponent } from './components/our-programs/supprimer-programme/supprimer-programme.component';
import { ModifierProgrammeComponent } from './components/our-programs/modifier-programme/modifier-programme.component';
import { OurProgramsComponent } from './components/our-programs/our-programs.component';
import { ProgrammeDetailComponent } from './components/our-programs/programme-detail/programme-detail.component';

import { SuiviComponent } from './components/suivis/suivi/suivi.component';

import { ModifierExerciceComponent } from './pages/exercices/modifier-exercice/modifier-exercice.component';
import { AjouterExerciceComponent } from './pages/exercices/ajouter-exercice/ajouter-exercice.component';
import { ExercicesComponent } from './pages/exercices/exercices.component';
import { ExerciseListComponent } from './pages/exercices/exercise-list/exercise-list.component';

import { ListeUtilisateursComponent } from './components/users/liste-utilisateurs/liste-utilisateurs.component';
import { AjouterUtilisateurComponent } from './components/users/ajouter-utilisateur/ajouter-utilisateur.component';
import { ModifierUtilisateurComponent } from './components/users/modifier-utilisateur/modifier-utilisateur.component';


import { CalorieCalculatorComponent } from './components/our-fitness/calorie-calculator/calorie-calculator.component';
import { BmiCalculatorComponent } from './components/our-fitness/bmi-calculator/bmi-calculator.component';
import { MacronutrientCalculatorComponent } from './components/our-fitness/macronutrient-calculator/macronutrient-calculator.component';
import { GoalSettingToolComponent } from './components/our-fitness/goal-setting-tool/goal-setting-tool.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReservationFacileComponent } from './components/reservation-facile/reservation-facile.component';
//import { AuthGuard } from 'auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminReservationsComponent } from './pages/admin-reservations.component';
import { CoachVirtuelComponent } from './components/coach-virtuel/coach-virtuel.component';
import { MirrorComponent } from './mirror/mirror.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
 
})

export const routes: Routes = [

  // Pages principales
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'programmes', component: OurProgramsComponent },
  { path: 'coaching', component: CoachComponent },
  { path: 'Membership', component: MembershipComponent },
  // { path: 'aboutUs', component:aboutUs},

  // Exercices
  { path: 'exercices', component: ExercicesComponent },
  { path: 'exercise-list', component: ExerciseListComponent },
  { path: 'ajouter-exercice', component: AjouterExerciceComponent },
  { path: 'modifier-exercice/:id', component: ModifierExerciceComponent },
  { path: 'exercices/:muscle', component: ExercicesComponent },

  // Programme CRUD
  { path: 'ajouter-programme', component: AjouterProgrammeComponent },
  { path: 'modifier-programme/:id', component: ModifierProgrammeComponent },
  { path: 'supprimer-programme', component: SupprimerProgrammeComponent },
  { path: 'programmes', component: OurProgramsComponent },
  { path: 'programme/:id', component: ProgrammeDetailComponent },
  
  { path: 'suivis', component: SuiviComponent },

  // Utilisateurs
  { path: 'utilisateurs', component: ListeUtilisateursComponent },
  { path: 'ajouter-utilisateur', component: AjouterUtilisateurComponent },
  { path: 'modifier-utilisateur/:id', component: ModifierUtilisateurComponent },

  // Programme détails (à placer après /programmes pour éviter conflit)
  { path: 'programme/:id', component: ProgrammeDetailComponent },

  // Admin routes sécurisées
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'coach',
    component: CoachComponent,
    canActivate: [RoleGuard],
    data: { role: 'coach' }
  },
  {
    path: 'programmes',
    component: OurProgramsComponent
  },

   //our Fitness
  { path: 'calorie-calculator', component: CalorieCalculatorComponent },
  { path: 'bmi-calculator', component: BmiCalculatorComponent },
  { path: 'macronutrient-calculator', component: MacronutrientCalculatorComponent },
  { path: 'goal-setting', component: GoalSettingToolComponent },
  
  //Réservation Facile
  { path: '', component: HomeComponent },
  { path: 'reservation', component: ReservationFacileComponent, canActivate: [AuthGuard] },

  { path: 'admin/reservations',component: AdminReservationsComponent,
  canActivate: [AuthGuard],
},

// Coach IA (DeepSeek)
{ path: 'coach-virtuel', component: CoachVirtuelComponent },

//MagicMirror
{ path: 'mirror', component: MirrorComponent },


  // Redirection pour routes inconnues
  {
    path: '**',
    redirectTo: ''
  },
  

];
