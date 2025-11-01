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
        // Kita mau MODIFIKASI tabel 'dpcs'
        Schema::table('dpcs', function (Blueprint $table) {
            // Tambahkan kolom-kolom baru ini SETELAH 'nama_dpc'
            $table->text('alamat')->nullable()->after('nama_dpc');
            $table->string('telepon')->nullable()->after('alamat');
            $table->string('email')->nullable()->after('telepon');
            $table->string('ketua')->nullable()->after('email');
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
        Schema::table('dpcs', function (Blueprint $table) {
            $table->dropColumn([
                'alamat',
                'telepon',
                'email',
                'ketua',
                'sekretaris',
                'bendahara',
                'status',
            ]);
        });
    }
};
