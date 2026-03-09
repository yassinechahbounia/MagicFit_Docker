<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    // ✅ Test inscription réussie
    public function test_register_success(): void
    {
        $response = $this->postJson('/api/register', [
            'name'     => 'Test User',
            'email'    => 'test@magicfit.com',
            'password' => 'password123',
            'role'     => 'utilisateur',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['message', 'token', 'user']);

        $this->assertDatabaseHas('users', ['email' => 'test@magicfit.com']);
    }

    // ❌ Test inscription avec validation échouée
    public function test_register_validation_fails(): void
    {
        $response = $this->postJson('/api/register', [
            'name'  => '',
            'email' => 'not-an-email',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name', 'email', 'password', 'role']);
    }

    // ✅ Test connexion réussie
    public function test_login_success(): void
    {
        $user = User::factory()->create([
            'email'    => 'login@magicfit.com',
            'password' => bcrypt('password123'),
            'role'     => 'utilisateur',
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'login@magicfit.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['message', 'token', 'user']);
    }

    // ❌ Test connexion avec mauvais mot de passe
    public function test_login_fails_with_wrong_password(): void
    {
        User::factory()->create([
            'email'    => 'fail@magicfit.com',
            'password' => bcrypt('password123'),
            'role'     => 'utilisateur',
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'fail@magicfit.com',
            'password' => 'wrong_password',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    // ✅ Test déconnexion
    public function test_logout(): void
    {
        $user = User::factory()->create(['role' => 'utilisateur']);

        $response = $this->actingAs($user)
                         ->postJson('/api/logout');

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Déconnexion réussie']);
    }

    // ✅ Test récupérer profil
    public function test_me_returns_authenticated_user(): void
    {
        $user = User::factory()->create(['role' => 'utilisateur']);

        $response = $this->actingAs($user)
                         ->getJson('/api/me');

        $response->assertStatus(200)
                 ->assertJsonFragment(['email' => $user->email]);
    }

    // ❌ Test accès sans authentification
    public function test_me_unauthenticated_returns_401(): void
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(401);
    }
}
