<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\ProgrammeUser;
use App\Models\Suivi;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function suivis()
{
    return $this->hasMany(Suivi::class);
}
//     public function subscriptions() {
//     return $this->hasMany(Subscription::class);
// }
public function programmes()
{
    return $this->belongsToMany(Programme::class, 'user_programme')
                ->withPivot('coach_id')
                ->with('coach');
                // ->withTimestamps();
}

public function coachedProgrammes()
{
    return $this->hasManyThrough(Programme::class, ProgrammeUser::class, 'coach_id', 'id', 'id', 'programme_id');
}

public function coachUsers()
{
    return $this->hasManyThrough(
        User::class,
        ProgrammeUser::class,
        'coach_id',    // Foreign key on programme_user table
        'id',          // Foreign key on users table
        'id',          // Local key on coaches table (user)
        'user_id'      // Local key on programme_user table
    )->distinct();
}

}
