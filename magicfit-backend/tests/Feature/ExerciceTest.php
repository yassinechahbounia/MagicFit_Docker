<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Exercice;
use App\Models\Programme;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExerciceTest extends TestCase
{
    use RefreshDatabase;

    private User $coach;

    protected function setUp(): void
    {
        parent::setUp();
        $this->coach = User::factory()->create(['role' => 'coach']);
    }

    // ✅ Test lister les exercices
    public function test_index_returns_exercices(): void
    {
        $response = $this->actingAs($this->coach)
                         ->getJson('/api/exercices');

        $response->assertStatus(200);
    }

    // ✅ Test créer un exercice
    public function test_store_creates_exercice(): void
    {
        $programme = Programme::factory()->create();

        $response = $this->actingAs($this->coach)
                         ->postJson('/api/exercices', [
                             'nom'          => 'Squat',
                             'muscle'       => 'Jambes',
                             'image'        => 'squat.jpg',
                             'programme_id' => $programme->id,
                         ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['nom' => 'Squat']);

        $this->assertDatabaseHas('exercices', ['nom' => 'Squat']);
    }

    // ❌ Test créer sans données requises
    public function test_store_validation_fails(): void
    {
        $response = $this->actingAs($this->coach)
                         ->postJson('/api/exercices', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['nom', 'muscle', 'programme_id']);
    }

    // ✅ Test voir un exercice
    public function test_show_returns_exercice(): void
    {
        $exercice = Exercice::factory()->create();

        $response = $this->actingAs($this->coach)
                         ->getJson("/api/exercices/{$exercice->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['nom' => $exercice->nom]);
    }

    // ❌ Test voir un exercice inexistant
    public function test_show_returns_404_for_missing(): void
    {
        $response = $this->actingAs($this->coach)
                         ->getJson('/api/exercices/99999');

        $response->assertStatus(404);
    }

    // ✅ Test supprimer un exercice
    public function test_destroy_deletes_exercice(): void
    {
        $exercice = Exercice::factory()->create();

        $response = $this->actingAs($this->coach)
                         ->deleteJson("/api/exercices/{$exercice->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('exercices', ['id' => $exercice->id]);
    }
}
