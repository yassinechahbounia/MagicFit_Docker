<?php

namespace App\Jobs;

use App\Models\Reservation;
use App\Notifications\ReservationConfirmee;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use App\Http\Controllers\TempNotifiableUser;

class ProcessReservationNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $reservation;

    /**
     * Create a new job instance.
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info('Début traitement asynchrone réservation (SQS)', ['reservation_id' => $this->reservation->id]);

        Notification::route('mail', $this->reservation->email)
            ->notify(new ReservationConfirmee($this->reservation));

        $user = new TempNotifiableUser();
        $user->name = $this->reservation->nom;
        $user->email = $this->reservation->email;
        $user->notify(new ReservationConfirmee($this->reservation));

        Log::info('Fin traitement asynchrone réservation (SQS)', ['reservation_id' => $this->reservation->id]);
    }
}
