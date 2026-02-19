<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProgrammeController;
use App\Http\Controllers\ExerciceController;
use App\Http\Controllers\SuiviController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CoachVirtuelController;
use App\Http\Controllers\MirrorController;
use App\Http\Controllers\UserProgrammeController;


/*
|--------------------------------------------------------------------------
| API Routes Laravel
|--------------------------------------------------------------------------
*/

// ✅ Authentification publique
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Routes protégées avec Sanctum
Route::middleware(['auth:sanctum'])->group(function () {

    // 🔐 Déconnexion + profil
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // ✅ Programmes dynamiques selon rôle connecté
    Route::get('/programmes', function (Request $request) {
        $user = $request->user();

        return match ($user->role) {
            'admin' => response()->json([
                ['nom' => 'Admin Program 1', 'description' => 'Admin desc', 'image' => 'admin1.jpg'],
                ['nom' => 'Admin Program 2', 'description' => 'Admin desc', 'image' => 'admin2.jpg'],
            ]),
            'coach' => response()->json([
                ['nom' => 'Coach Program A', 'description' => 'For your clients', 'image' => 'coach1.jpg'],
            ]),
            default => response()->json([
                ['nom' => 'Losing Weight', 'description' => 'Burn fat easily', 'image' => '1.jpg'],
                ['nom' => 'Body Building', 'description' => 'Gain muscle', 'image' => '2.jpg'],
            ]),
        };
    });

    // ✅ Exercices (CRUD sauf show)
    Route::apiResource('exercices', ExerciceController::class)->only([
        'index',
        'store',
        'update',
        'destroy'
    ]);
    Route::get('/exercices/{id}', [ExerciceController::class, 'show']);

    // ✅ Suivis (index, store, destroy)
    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/suivis', [SuiviController::class, 'index']);
    Route::post('/suivis', [SuiviController::class, 'store']);
    Route::delete('/suivis/{id}', [SuiviController::class, 'destroy']);
});


    // ✅ Réservations (utilisateurs connectés)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/reservations', [ReservationController::class, 'index']);
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::put('/reservations/{id}', [ReservationController::class, 'update']);
        Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
    });

    // ✅ Routes réservées aux coachs et admins
    Route::middleware('coach-or-admin')->group(function () {

        // 🔹 Programmes complets
        Route::get('/programmes', [ProgrammeController::class, 'index']);
        Route::get('/programmes/{id}', [ProgrammeController::class, 'show']);
        Route::post('/programmes', [ProgrammeController::class, 'store']);
        Route::put('/programmes/{id}', [ProgrammeController::class, 'update']);
        Route::delete('/programmes/{id}', [ProgrammeController::class, 'destroy']);

        //  Utilisateurs
        Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);
        // Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // UserProgramme

        Route::post('/assign-programme', [UserProgrammeController::class, 'assign']);
        Route::get('/user-programmes/{id}', [UserProgrammeController::class, 'getUserProgrammes']);
        Route::middleware('auth:sanctum')->get('/coach/utilisateurs', [ProgrammeController::class, 'getAssignedUsers']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/coach/programmes/{programme}/assign', [ProgrammeController::class, 'assignUser']);
            Route::delete('/coach/programmes/{programme}/unassign/{user}', [ProgrammeController::class, 'unassignUser']);
        });
        Route::get('/users', function () {
            return \App\Models\User::all();
        });

        //  Admin : gestion réservations (admin page)
        Route::get('/admin/reservations', [ReservationController::class, 'adminList']);
        Route::put('/admin/reservations/{id}', [ReservationController::class, 'update']);
    });

    // Coach Virtuel
    Route::middleware('auth:sanctum')->post('/coach-virtuel', [CoachVirtuelController::class, 'handle']);
    // Route::post('/coach-ia', [AIController::class, 'askCoach']);

    Route::post('/coach-virtuel', [CoachVirtuelController::class, 'handle']);

    //MagicMirror
    Route::get('/mirror/cacher-horloge', [MirrorController::class, 'cacherHorloge']);
    Route::get('/mirror/afficher-horloge', [MirrorController::class, 'afficherHorloge']);
});
