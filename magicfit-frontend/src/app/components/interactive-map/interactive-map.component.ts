import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-interactive-map',
  imports: [CommonModule],
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.scss'
})
export class InteractiveMapComponent {
  private router = inject(Router);

  selectedMuscle: string = '';
  selectedExercises: { name: string; gif: string }[] = [];

  exerciseData: Record<string, { name: string; gif: string }[]> = {
    Chest: [
      { name: "Bench Press", gif: "./assets/images/gifs/chest/bench-press.gif" },
      { name: "Incline Dumbbell Press", gif: "./assets/images/gifs/chest/incline-dumbbell-press.gif" },
      { name: "Chest Fly", gif: "./assets/images/gifs/chest/chest_fly.gif" }
    ],
    Biceps: [
      { name: "Bicep Curl", gif: "./assets/images/gifs/Biceps/bicep-curl.gif" },
      { name: "Hammer Curl", gif: "./assets/images/gifs/Biceps/hammer-curl.gif" },
      { name: "Concentration Curl", gif: "./assets/images/gifs/Biceps/concentration-curl.gif" }
    ],
    Legs: [
      { name: "Squat", gif: "./assets/images/gifs/Legs/squat.gif" },
      { name: "Leg Press", gif: "./assets/images/gifs/Legs/leg-press.gif" },
      { name: "Lunges", gif: "./assets/images/gifs/Legs/lunges.gif" }
    ],
    Triceps: [
      { name: "Tricep Dips", gif: "./assets/images/gifs/Triceps/tricep-dips.gif" },
      { name: "Skull Crushers", gif: "./assets/images/gifs/Triceps/skull-crushers.gif" },
      { name: "Push-ups", gif: "./assets/images/gifs/Triceps/push-ups.gif" }
    ],
    Shoulders: [
      { name: "Shoulder Press", gif: "./assets/images/gifs/Shoulders/shoulder-press.gif" },
      { name: "Lateral Raise", gif: "./assets/images/gifs/Shoulders/lateral-raise.gif" },
      { name: "Front Raise", gif: "./assets/images/gifs/Shoulders/front-raise.gif" }
    ],
    Abds: [
      { name: "Crunches", gif: "./assets/images/gifs/Abds/crunches.gif" },
      { name: "Plank", gif: "./assets/images/gifs/Abds/plank.jpg" },
      { name: "Leg Raises", gif: "./assets/images/gifs/Abds/leg-raises.gif" }
    ],
    Forearms: [
      { name: "Wrist Curls", gif: "./assets/images/gifs/Forearms/wrist-curls.gif" },
      { name: "Reverse Wrist Curls", gif: "./assets/images/gifs/Forearms/reverse-wrist-curls.jpg" },
      { name: "Forearm Plank", gif: "./assets/images/gifs/Forearms/forearm-plank.gif" }
    ],
    Calves: [
      { name: "Calf Raises", gif: "./assets/images/gifs/Calves/calf-raises.gif" },
      { name: "Seated Calf Raises", gif: "./assets/images/gifs/Calves/seated-calf-raises.gif" },
      { name: "Calf Press", gif: "./assets/images/gifs/Calves/calf-press.gif" }
    ]
  };

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // à adapter selon ton système AuthService
  }

  showExercises(muscle: string): void {
    if (!this.isAuthenticated()) {
      alert('Veuillez vous connecter pour voir les exercices.');
      this.router.navigate(['/login']);
      return;
    }

    this.selectedMuscle = muscle;
    this.selectedExercises = this.exerciseData[muscle] || [];
  }
}
