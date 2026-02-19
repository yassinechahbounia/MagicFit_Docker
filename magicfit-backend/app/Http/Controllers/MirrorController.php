<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;

class MirrorController extends Controller
{
    public function cacherHorloge() {
        Http::get('http://127.0.0.1:8081/api/module/clock/hidden');
        return response()->json(['status' => 'ok']);
    }

    public function afficherHorloge() {
        Http::get('http://127.0.0.1:8081/api/module/clock/visible');
        return response()->json(['status' => 'ok']);
    }
}
