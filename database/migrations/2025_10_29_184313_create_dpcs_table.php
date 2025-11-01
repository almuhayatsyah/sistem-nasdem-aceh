<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dpcs', function (Blueprint $table) {
            $table->id();
            // INI DIA PERBAIKANNYA: 'dpds' (PAKE S)
            $table->foreignId('dpd_id')->constrained('dpds')->onDelete('cascade');
            $table->string('nama_dpc');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dpcs');
    }
};
