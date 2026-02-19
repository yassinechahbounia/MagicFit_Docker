<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Suivi extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'poids',
        'repetitions',
        'commentaire'
    ];

    // 🔁 Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
