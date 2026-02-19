<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercice;

class ExerciceController extends Controller
{
    // ✅ Lister tous les exercices ou par muscle
    public function index(Request $request)
{
    if ($request->filled('muscle')) {
        return Exercice::with('programme')->where('muscle', $request->muscle)->get();
    }

    return Exercice::with('programme')->get();
}


    // ✅ Créer un exercice
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'muscle' => 'required|string',
            'image' => 'nullable|string',
            'programme_id' => 'required|exists:programmes,id'
        ]);

        $exercice = Exercice::create($request->all());

        return response()->json($exercice, 201);
    }

    // ✅ Voir un exercice
    public function show($id)
{
    $exercice = Exercice::find($id);
    if (!$exercice) {
        return response()->json(['message' => 'Exercice non trouvé'], 404);
    }
    return response()->json($exercice);
}
    // ✅ Modifier un exercice
    public function update(Request $request, $id)
{
    $exercice = Exercice::find($id);
    if (!$exercice){
        return response()->json(['message' => 'Non trouvé'], 404);
    }
    $exercice->update($request->all());
    return response()->json(['message' => 'Exercice Modifié', 'exercice' => $exercice]);
}

    // ✅ Supprimer
    public function destroy($id)
{
    $exercice = Exercice::find($id);
    if (!$exercice){
        return response()->json(['message' => 'Non trouvé'], 404);
    }
    $exercice->delete();
    return response()->json(['message' => 'Exercice Supprimé']);
}
}
