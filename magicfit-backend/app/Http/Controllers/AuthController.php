<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    // 🔐 Inscription
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:utilisateur,coach,admin',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $token = $user->createToken('token')->plainTextToken;

        Log::info('Nouvel utilisateur inscrit', ['user_id' => $user->id, 'email' => $user->email, 'role' => $user->role]);

        return response()->json([
            'message' => 'Inscription réussie',
            'token' => $token,
            'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            ]
        ]);
    }

    // 🔑 Connexion
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            Log::warning('Tentative de connexion échouée', ['email' => $request->email, 'ip' => $request->ip()]);
            throw ValidationException::withMessages([
                'email' => ['Les informations de connexion sont incorrectes.'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;

        Log::info('Connexion réussie', ['user_id' => $user->id, 'email' => $user->email]);

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user
        ]);
    }

    // 🔓 Déconnexion
    public function logout(Request $request)
    {
        Log::info('Déconnexion', ['user_id' => $request->user()->id]);
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    // 👤 Récupérer l'utilisateur connecté
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
