<?php

namespace Database\Factories;

use App\Models\Programme;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exercice>
 */
class ExerciceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->word(),
            'muscle' => fake()->randomElement(['Dos', 'Bras', 'Jambes', 'Pectoraux', 'Epaules', 'Abdos']),
            'image' => fake()->imageUrl(),
            'programme_id' => Programme::factory(), // Creates a programme automatically if not provided
        ];
    }
}
