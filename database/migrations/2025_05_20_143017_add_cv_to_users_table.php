<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  

    /**
     * Reverse the migrations.
     */
    public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('cv')->nullable();
    });
}
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
