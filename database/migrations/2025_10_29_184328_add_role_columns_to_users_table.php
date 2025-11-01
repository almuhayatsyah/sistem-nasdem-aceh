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
        Schema::table('users', function (Blueprint $table) {
            $table->string('level')->after('password');
            // INI DIA PERBAIKANNYA: 'dpds' dan 'dpcs' (PAKE S)
            $table->foreignId('dpd_id')->nullable()->after('level')->constrained('dpds')->onDelete('set null');
            $table->foreignId('dpc_id')->nullable()->after('dpd_id')->constrained('dpcs')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['dpd_id']);
            $table->dropForeign(['dpc_id']);
            $table->dropColumn(['level', 'dpd_id', 'dpc_id']);
        });
    }
};
