<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_reservations_table.php

public function up()
{
    Schema::create('reservations', function (Blueprint $table) {
        $table->id();
        $table->string('nom');
        $table->string('email');
        $table->enum('type', ['collectif', 'prive']);
        $table->date('date');
        $table->time('heure');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
