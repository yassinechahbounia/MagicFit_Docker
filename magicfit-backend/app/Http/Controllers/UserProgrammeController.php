<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Programme;
use Illuminate\Http\Request;

class UserProgrammeController extends Controller
{
    // Attribuer un programme à un utilisateur avec un coach
    public function assign(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'programme_id' => 'required|exists:programmes,id',
            'coach_id' => 'nullable|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id);
        $user->programmes()->attach($request->programme_id, [
            'coach_id' => $request->coach_id,
        ]);

        return response()->json(['message' => 'Programme attribué avec succès']);
    }

    // Récupérer les programmes d'un utilisateur (avec coach)
    public function getUserProgrammes($id)
    {
        $user = User::with(['programmes' => function ($query) {
            $query->withPivot('coach_id');
        }])->findOrFail($id);

        return response()->json($user->programmes);
    }
}
