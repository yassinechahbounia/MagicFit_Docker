<?php
// ******************
namespace App\Http\Controllers;

use App\Models\Programme;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;

class ProgrammeController extends Controller
{
    // Liste tous les programmes avec exercices
    public function index()
    {
        return response()->json(Programme::with('exercices')->get());
    }

    // Voir un programme avec ses exercices
    public function show($id)
    {
        $programme = Programme::with('exercices')->find($id);

        if (!$programme) {
            return response()->json(['message' => 'Programme non trouvé'], 404);
        }

        return response()->json($programme);
    }

    // Créer un programme

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'description' => 'nullable|string',
            'categorie' => 'nullable|string',
            'image' => 'nullable|string',
            'objectif' => 'nullable|string',
            'nutrition' => 'nullable|array',
        ]);

        $programme = Programme::create($request->all());

        return response()->json($programme, 201);
    }


    // Modifier un programme
    public function update(Request $request, $id)
    {
        $programme = Programme::findOrFail($id);
        $programme->update($request->all());

        return response()->json($programme);
    }

    // Supprimer un programme
    public function destroy($id)
    {
        $programme = Programme::findOrFail($id);
        $programme->delete();

        return response()->json(['message' => 'Programme supprimé']);
    }


    public function userProgrammes($id)
    {
        $user = User::with(['programmes', 'programmes.coach'])->find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        return response()->json([
            'user' => $user->name,
            'programmes' => $user->programmes
        ]);
    }

    public function getAssignedUsers()
    {
        $coach = auth()->user();

        $users = \App\Models\User::whereHas('programmes', function ($query) use ($coach) {
            $query->wherePivot('coach_id', $coach->id);
        })->with(['programmes' => function ($q) use ($coach) {
            $q->wherePivot('coach_id', $coach->id);
        }])->get();

        return response()->json($users);
    }

    // Assigner un programme à un utilisateur
    public function assignUser(Request $request, $programmeId)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
    ]);

    $programme = Programme::findOrFail($programmeId);

    $programme->users()->attach($request->user_id, ['coach_id' => auth()->id()]);

    return response()->json(['message' => 'Utilisateur assigné avec succès']);
}
    // Désassigner un programme d'un utilisateur
    public function unassignUser($programmeId, $userId)
{
    $programme = Programme::findOrFail($programmeId);

    $programme->users()->detach($userId);

    return response()->json(['message' => 'Utilisateur retiré du programme']);
}


}