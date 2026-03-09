<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Programme>
 */
class ProgrammeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'categorie' => fake()->word(),
            'image' => fake()->imageUrl(),
            'objectif' => fake()->randomElement(['Prise de masse', 'Perte de poids', 'Remise en forme']),
        ];
    }
}
