<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Notifications\ReservationConfirmee;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Notifications\Notifiable;

class TempNotifiableUser
{
    use Notifiable;

    public $name;
    public $email;

    public function routeNotificationForMail()
    {
        return $this->email;
    }
}
class ReservationController extends Controller
{
    // 🔄 Lister toutes les réservations
    public function index()
    {
        return Reservation::all();
    }

    // ➕ Ajouter une réservation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'type' => 'required|in:Cours Collectif,Coaching Privé',
            'date' => 'required|date',
            'heure' => 'required',
            // 'created_at' => '',
            // 'updated_at' => ''
        ]);

        $mappedType = [
            'Cours Collectif' => 'collectif',
            'Coaching Privé' => 'prive'
        ];

        $validated['type'] = $mappedType[$request->input('type')] ?? 'collectif';

        $reservation = Reservation::create($validated);

        // Dispatch job in queue
        \App\Jobs\ProcessReservationNotification::dispatch($reservation);

        Log::info('Réservation créée', ['reservation_id' => $reservation->id, 'nom' => $reservation->nom, 'type' => $reservation->type]);

    return response()->json(['message' => 'Réservation créée avec succès (asynchrone)'], 201);
    }

    // 🔄 Modifier une réservation
    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'type' => 'required|in:Collectif,Privé',
            'date' => 'required|date',
            'heure' => 'required'
        ]);

        $reservation->update($validated);

        Log::info('Réservation modifiée', ['reservation_id' => $reservation->id]);

        return response()->json(['message' => 'Réservation modifiée avec succès']);
    }

    // 🗑️ Supprimer une réservation
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);

        Log::info('Réservation supprimée', ['reservation_id' => $reservation->id]);

        $reservation->delete();

        return response()->json(['message' => 'Réservation supprimée']);
    }
}
