<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use App\Models\Exercice;

class ExerciceSeeder extends Seeder
{
    public function run()
    {
        $exercices = [
            ['nom' => 'Squat', 'description' => 'Strengthens legs and glutes','muscle'=>''],
            ['nom' => 'Push-up', 'description' => 'Chest and triceps workout','muscle'=>''],
            ['nom' => 'Plank', 'description' => 'Core stability exercise','muscle'=>''],
            ['nom' => 'Lunges', 'description' => 'Lower body strengthening','muscle'=>''],
            ['nom' => 'Jumping Jacks', 'description' => 'Full-body cardio warm-up','muscle'=>''],
            ['nom' => 'Burpees', 'description' => 'Explosive cardio movement','muscle'=>''],
            ['nom' => 'Mountain Climbers', 'description' => 'Cardio and core focus','muscle'=>''],
            ['nom' => 'Sit-ups', 'description' => 'Abdominal exercise','muscle'=>''],
            ['nom' => 'Pull-up', 'description' => 'Upper back and biceps','muscle'=>''],
            ['nom' => 'Dips', 'description' => 'Triceps and chest','muscle'=>''],
        ];

        foreach ($exercices as $ex) {
            Exercice::firstOrCreate(
                ['nom' => $ex['nom']],
                [
                    'description' => $ex['description'],
                    'muscle' => $ex['muscle'],
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]
            );
        }
    }
}
