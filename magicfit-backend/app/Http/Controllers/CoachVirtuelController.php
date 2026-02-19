<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;



// class CoachVirtuelController extends Controller
// {
//     public function handle(Request $request)
//     {
//         set_time_limit(120);
//         // 🔧 Forcer Laravel à interpréter correctement les tableaux JSON
//         $data = $request->json()->all();

//         // ✅ Validation explicite
//         $validator = validator($data, [
//             'question' => 'required|string',
//             'historique' => 'nullable|array|min:0',
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'message' => 'Erreur de validation',
//                 'errors' => $validator->errors(),
//             ], 422);
//         }

//         $validated = $validator->validated();


//         // 🔐 API Key stockée dans .env
//         $apiKey = env('OPENROUTER_API_KEY');

//         // 🧠 Appel OpenRouter
//         $response = Http::withHeaders([
//             'Authorization' => "Bearer $apiKey",
//             'Content-Type' => 'application/json',
//         ])->timeout(120)->post('https://openrouter.ai/api/v1', [
//             // 'model' => 'openai/gpt-3.5-turbo',
//             'model' => 'deepseek/deepseek-r1:free',
//             'messages' => array_merge(
//                 [['role' => 'system', 'content' => 'Tu es un coach virtuel expert en musculation et nutrition.']],
//                 $validated['historique'],
//                 [['role' => 'user', 'content' => $validated['question']]]
//             )
//         ]);

//         if (!$response->successful()) {
//             return response()->json([
//                 'error' => 'Erreur API OpenRouter',
//                 'details' => $response->json(),
//             ], $response->status());
//         }

//         $result = $response->json();
//         dd($result);

//         return response()->json([
//             'reponse' => $result['choices'][0]['message']['content'] ?? 'Pas de réponse reçue',
//         ]);
//     }
// }

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CoachVirtuelController extends Controller
{
    public function handle(Request $request)
    {
        // Validation
        $validated = $request->validate([
            'question' => 'required|string',
            'historique' => 'nullable|array',
        ]);

        // 🔐 Clé API OpenRouter
        $apiKey = env('OPENROUTER_API_KEY');

        // 🔁 Construction des messages
        $messages = array_merge(
            [['role' => 'system', 'content' => 'Tu es un coach expert en musculation et nutrition.']],
            $validated['historique'] ?? [],
            [['role' => 'user', 'content' => $validated['question']]]
        );

        // ⚡ Appel à l’API OpenRouter
        $response = Http::withHeaders([
            'Authorization' => "Bearer $apiKey",
            'Content-Type' => 'application/json',
            'HTTP-Referer' => 'https://magicfit.ai',         // facultatif : ton site
            'X-Title' => 'MagicFit Coach IA',                // facultatif : ton projet
        ])
        ->timeout(120)
        ->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => 'deepseek/deepseek-r1:free',
            'messages' => $messages,
        ]);

        // 🛑 Gestion d'erreur
        if (!$response->successful()) {
            return response()->json([
                'error' => 'Erreur OpenRouter',
                'details' => $response->json(),
            ], $response->status());
        }

        // ✅ Réponse correcte
        $result = $response->json();
        return response()->json([
            'reponse' => $result['choices'][0]['message']['content'] ?? 'Pas de réponse générée',
        ]);
    }
}
