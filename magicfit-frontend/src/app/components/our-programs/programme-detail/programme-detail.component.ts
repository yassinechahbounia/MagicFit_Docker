import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProgrammeService } from 'src/app/services/programme.service';

@Component({
  selector: 'app-programme-detail',
  templateUrl: './programme-detail.component.html',
  styleUrls: ['./programme-detail.component.scss'],
  imports:[CommonModule]
})
export class ProgrammeDetailComponent implements OnInit {
  programme: any;
  router: any;

  constructor(
    private route: ActivatedRoute,
    private programmeService: ProgrammeService
  ) {}
staticPrograms = [
  {
    id: 1,
    nom: 'LOSING WEIGHT',
    description: 'Effective training and coaching to help you burn fat and get in shape.',
    categorie: 'Cardio',
    image: '1.jpg',
    exercices: []
  },
  {
    id: 2,
    nom: 'BUILDING MUSCLE',
    description: 'Structured plans designed for hypertrophy and muscle growth.',
    categorie: 'Musculation',
    objectif: 'Prise de masse',
    image: '2.jpg',
    exercices: [{ nom: 'bench-press', gif: 'bench-press.gif' }]
  },
  {
    id: 3,
    nom: 'TRAINING AT HOME',
    description: 'No gym? No problem. Workout programs for your living room.',
    categorie: 'Home',
    image: '3.jpg',
    exercices: [{ nom: 'Pushups', gif: 'Pushups.gif' }]

  },
  {
    id: 4,
    nom: 'GYM PLAN',
    description: 'Advanced and personalized plans for gym-goers of all levels.',
    categorie: 'Gym',
    image: 'gym plan.svg',
    exercices: []
  }
];

  ngOnInit(): void {
  const id = +this.route.snapshot.paramMap.get('id')!;

  const staticProgram = this.staticPrograms.find(p => p.id === id);
  if (staticProgram) {
    this.programme = staticProgram;
    return;
  }

  // Sinon, c'est un programme depuis l'API
  this.programmeService.getProgrammeById(id).subscribe({
    next: (data) => {
      this.programme = data;
    },
    error: () => {
      this.router.navigate(['/not-found']);
    }
  });
}
  }
