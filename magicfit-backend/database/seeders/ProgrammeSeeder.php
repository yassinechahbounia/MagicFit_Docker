<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use App\Models\Programme;
use App\Models\Exercice;

class ProgrammeSeeder extends Seeder
{
    public function run()
    {
        // جيب/خلق exercices (مزيان تخليهم firstOrCreate ولكن خاصهم يكون عندهم باقي الحقول الإجباريّة)
        $squat = Exercice::firstWhere('nom', 'Squat');
        $pushup = Exercice::firstWhere('nom', 'Push-up');
        $plank = Exercice::firstWhere('nom', 'Plank');
        $jumpingJacks = Exercice::firstWhere('nom', 'Jumping Jacks');
        $lunges = Exercice::firstWhere('nom', 'Lunges');

        // إذا شي exercice ما لقاهاش (مثلا seeder ديال exercices ما تخدمش) وقف برسالة واضحة
        if (!$squat || !$pushup || !$plank || !$jumpingJacks || !$lunges) {
            throw new \RuntimeException("Exercices not seeded yet. Run ExerciceSeeder first.");
        }

        // Programme: updateOrCreate باش ما يتكررش
        $programme = Programme::updateOrCreate(
            ['nom' => 'Training at Home'], // key unique منطقياً
            [
                'description' => 'No gym? No problem. Workout programs for your living room.',
                'categorie' => 'Fitness',
                'image' => 'home.jpg',
                'updated_at' => Carbon::now(),
            ]
        );

        // sync بدل attach: ما يكرّرش pivot rows
        $programme->exercices()->sync([
            $squat->id,
            $pushup->id,
            $plank->id,
            $jumpingJacks->id,
            $lunges->id,
        ]);
    }
}
