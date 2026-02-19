<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'muscle', 'image', 'programme_id'];

    public function programme()
    {
        //return $this->belongsTo(Programme::class);
        return $this->belongsToMany(Programme::class, 'exercice_programme', 'exercice_id', 'programme_id');

    }
}

