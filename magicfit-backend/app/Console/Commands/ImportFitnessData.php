<?php

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Suivi;
use League\Csv\Reader;

class ImportFitnessData extends Command
{
    protected $signature = 'import:fitness';

    public function handle()
    {
        $path = storage_path('app/fitness_data/Fitness_data.csv');
        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0);

        foreach ($csv as $record) {
            $user = User::where('email', $record['Email'])->first(); // ou autre mapping

            if ($user) {
                Suivi::create([
                    'user_id' => $user->id,
                    'date' => $record['Date'],
                    'battement_heart_rate' => $record['Heart Rate'],
                    'calories' => $record['Calories'],
                    'distance' => $record['Distance'],
                    'steps' => $record['Steps'],
                    'sommeil' => $record['Sleep Hours'],
                    'commentaire' => $record['Activity'],
                ]);
            }
        }

        $this->info("✔️ Données fitness importées avec succès !");
    }
}
