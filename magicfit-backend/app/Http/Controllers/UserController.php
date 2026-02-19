<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    // 🔐 Afficher tous les utilisateurs (admin uniquement)
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        return response()->json(User::all());
    }

    //Function Show 
    public function show($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    return response()->json($user);
}

    //  Ajouter un utilisateur
    public function store(Request $request)
    {
        $request->validate([
    'name' => 'required|string',
    'email' => 'required|email|unique:users',
    'role' => 'required|in:admin,coach,client',
    'password' => 'required|string|min:6',
]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Utilisateur ajouté avec succès'], 201);
    }

    // ✏️ Mettre à jour un utilisateur
    public function update(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    // ✅ Validation avec mot de passe requis
     $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:users,email,' . $id,
        'role' => 'required|string',
        'password' => 'required|string|min:6',
    ]);

      if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $user->name = $request->name;
    $user->email = $request->email;
    $user->role = $request->role;
    $user->password = Hash::make($request->password);
     
    $user->save();

    return response()->json(['message' => 'Utilisateur mis à jour avec succès']);
}


    // ❌ Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
