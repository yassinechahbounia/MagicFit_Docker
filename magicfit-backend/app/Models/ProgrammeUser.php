<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammeUser extends Model
{
    use HasFactory;
    protected $table = 'programme_user';
    public $timestamps = false;

}
