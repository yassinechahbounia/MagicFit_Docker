<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIController extends Controller
{
    public function askCoach(Request $request)
    {
        $question = $request->input('message');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer VOTRE_CLE_API_OPENAI',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => "Tu es un coach sportif professionnel appelé MagicFit Coach. Donne des réponses claires et motivantes."],
                ['role' => 'user', 'content' => $question],
            ],
        ]);

        return response()->json($response->json()['choices'][0]['message']['content']);
    }
}
