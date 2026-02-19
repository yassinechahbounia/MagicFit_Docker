import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  exerciseData = {
    Chest: [
      { name: "Bench Press", gif: "assets/images/gifs/chest/bench-press.gif" },
      { name: "Incline Dumbbell Press", gif: "assets/images/gifs/chest/incline-dumbbell-press.gif" },
      { name: "Chest Fly", gif: "assets/images/gifs/chest/chest_fly.gif" }
    ],
    Biceps: [
      { name: "Bicep Curl", gif: "assets/images/gifs/Biceps/bicep-curl.gif" },
      { name: "Hammer Curl", gif: "assets/images/gifs/Biceps/hammer-curl.gif" },
      { name: "Concentration Curl", gif: "assets/images/gifs/Biceps/concentration-curl.gif" }
    ],
    Legs: [
    { name: "Squat", gif: "./images/gifs/Legs/squat.gif" },
    { name: "Leg Press", gif: "./images/gifs/Legs/leg-press.gif" },
    { name: "Lunges", gif: "./images/gifs/Legs/lunges.gif"}
  ],
  Triceps: [
    { name: "Tricep Dips", gif: "./images/gifs/Triceps/tricep-dips.gif" },
    { name: "Skull Crushers", gif: "./images/gifs/Triceps/skull-crushers.gif" },
    { name: "Push-ups", gif: "./images/gifs/Triceps/push-ups.gif" }
  ],
  Shoulders: [
    { name: "Shoulder Press", gif: "./images/gifs/Shoulders/shoulder-press.gif" },
    { name: "Lateral Raise", gif: "./images/gifs/Shoulders/lateral-raise.gif" },
    { name: "Front Raise", gif: "./images/gifs/Shoulders/front-raise.gif" }
  ],
  Abds: [
    { name: "Crunches", gif: "./images/gifs/Abds/crunches.gif" },
    { name: "Plank", gif: "./images/gifs/Abds/plank.jpg" },
    { name: "Leg Raises", gif: "./images/gifs/Abds/leg-raises.gif" }
  ],
  Forearms: [
    { name: "Wrist Curls", gif: "./images/gifs/Forearms/wrist-curls.gif" },
    { name: "Reverse Wrist Curls", gif: "./images/gifs/Forearms/reverse-wrist-curls.jpg" },
    { name: "Forearm Plank", gif: "./images/gifs/Forearms/forearm-plank.gif" }
  ],
  Calves: [
    { name: "Calf Raises", gif: "./images/gifs/Calves/calf-raises.gif" },
    { name: "Seated Calf Raises", gif: "./images/gifs/Calves/seated-calf-raises.gif" },
    { name: "Calf Press", gif: "./images/gifs/Calves/calf-press.gif" }
  ]
};
  // getExercisesByMuscle(muscle: string) {
  //   return this.exerciseData[muscle] || [];
  // }
}
