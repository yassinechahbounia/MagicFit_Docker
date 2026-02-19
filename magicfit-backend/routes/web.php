<?php

use Illuminate\Support\Facades\Route;
use App\Models\Reservation;
use App\Notifications\ReservationConfirmee;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-email', function () {
    $reservation = new Reservation([
        'nom' => 'Test User',
        'email' => 'test@example.com',
        'type' => 'collectif',
        'date' => now()->toDateString(),
        'heure' => now()->format('H:i:s'),
    ]);

    $user = new \Illuminate\Foundation\Auth\User;
    $user->name = $reservation->nom;
    $user->email = $reservation->email;
    $user->notify(new ReservationConfirmee($reservation));

    return 'E-mail envoyé à test@example.com';
});