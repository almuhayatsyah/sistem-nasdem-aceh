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
        // Kita mau MODIFIKASI tabel 'dpds'
        Schema::table('dpds', function (Blueprint $table) {
            // Tambahkan kolom-kolom baru ini SETELAH 'nama_dpd'
            $table->string('lokasi')->nullable()->after('nama_dpd');
            $table->text('alamat')->nullable()->after('lokasi');
            $table->string('telepon')->nullable()->after('alamat');
            $table->string('email')->nullable()->after('telepon');
            $table->string('website')->nullable()->after('email');
            $table->string('ketua')->nullable()->after('website');
            $table->string('sekretaris')->nullable()->after('ketua');
            $table->string('bendahara')->nullable()->after('sekretaris');
            $table->string('status')->default('active')->after('bendahara');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Kalau mau rollback, hapus kolom-kolom ini
        Schema::table('dpds', function (Blueprint $table) {
            $table->dropColumn([
                'lokasi',
                'alamat',
                'telepon',
                'email',
                'website',
                'ketua',
                'sekretaris',
                'bendahara',
                'status',
            ]);
        });
    }
};
