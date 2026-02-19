<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin 1',
            'email' => 'admin1@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Coach 1',
            'email' => 'coach1@example.com',
            'password' => Hash::make('password123'),
            'role' => 'coach',
        ]);

        User::create([
            'name' => 'Utilisateur 1',
            'email' => 'user1@example.com',
            'password' => Hash::make('password123'),
            'role' => 'utilisateur',
        ]);
    }
}
