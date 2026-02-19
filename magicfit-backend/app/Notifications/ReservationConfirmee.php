<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Reservation;

class ReservationConfirmee extends Notification
{
    use Queueable;

    public $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('✅ Réservation Confirmée')
            ->greeting('Bonjour ' . $this->reservation->nom . ' !')
            ->line('Votre réservation a bien été prise en compte !')
            // ->line('🧘 Type : ' . ucfirst($this->reservation->type))
            ->line('📅 Date : ' . $this->reservation->date)
            ->line('🕒 Heure : ' . $this->reservation->heure)
            ->line("📌 Type : " . $this->reservation->type)
            ->line('Nous vous contacterons bientôt pour la confirmation finale.')
            ->salutation('Sportivement, l\'équipe MagicFit');
    }
}
