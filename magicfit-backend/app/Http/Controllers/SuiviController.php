<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Suivi;

class SuiviController extends Controller
{
    // 🔍 Liste des suivis avec utilisateur lié
    public function index()
    {
        return response()->json(Suivi::with('user')->get());
    }

    // ➕ Ajouter un suivi
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'poids' => 'nullable|numeric',
            'repetitions' => 'required|numeric',
            'commentaire' => 'nullable|string',
        ]);

        $suivi = Suivi::create($validated);

        return response()->json([
            'message' => 'Suivi ajouté avec succès',
            'suivi' => $suivi,
        ], 201);
    }

    // ❌ Supprimer un suivi
    public function destroy($id)
    {
        $suivi = Suivi::find($id);

        if (!$suivi) {
            return response()->json(['message' => 'Suivi non trouvé'], 404);
        }

        $suivi->delete();

        return response()->json(['message' => 'Suivi supprimé']);
    }
}

