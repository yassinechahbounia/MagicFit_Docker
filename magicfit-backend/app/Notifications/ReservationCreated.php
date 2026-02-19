<?php
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ReservationCreated extends Notification
{
    public function __construct(public $reservation) {}

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Confirmation de votre réservation')
            ->greeting('Bonjour ' . $this->reservation->nom)
            ->line("Votre réservation pour un {$this->reservation->type} le {$this->reservation->date} à {$this->reservation->heure} a bien été enregistrée.")
            ->line("Merci pour votre confiance !");
    }
}
