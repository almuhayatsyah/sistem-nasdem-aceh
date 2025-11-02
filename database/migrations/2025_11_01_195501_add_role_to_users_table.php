<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Perintah: php artisan make:migration add_role_to_users_table --table=users
     */
    public function up(): void
    {
        // Kita MODIFIKASI tabel 'users' yang sudah ada
        Schema::table('users', function (Blueprint $table) {

            // 1. Tambah Role (setelah 'remember_token' atau kolom terakhir)
            $table->enum('role', ['DPW', 'Admin DPD', 'Admin DPC'])
                ->default('Admin DPC')
                ->after('remember_token');

            // 2. Tambah Status Admin
            $table->enum('status', ['Aktif', 'Nonaktif'])
                ->default('Aktif')
                ->after('role');

            // 3. Foreign Key ke DPD (Nullable, karena DPW/Admin DPC gak punya)
            //    Pastikan tipe datanya sama dengan 'id' di tabel 'dpds' (bigInteger unsigned)
            $table->foreignId('dpd_id')
                ->nullable()
                ->after('status')
                ->constrained('dpds') // Ke tabel 'dpds'
                ->onDelete('set null'); // Kalau DPD dihapus, admin ini jadi null

            // 4. Foreign Key ke DPC (Nullable, karena DPW/Admin DPD gak punya)
            $table->foreignId('dpc_id')
                ->nullable()
                ->after('dpd_id')
                ->constrained('dpcs') // Ke tabel 'dpcs'
                ->onDelete('set null'); // Kalau DPC dihapus, admin ini jadi null
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Kalau di-rollback, hapus kolom-kolom ini
        Schema::table('users', function (Blueprint $table) {
            // Hati-hati, hapus foreign key dulu sebelum kolomnya
            // Nama foreign key biasanya: users_dpd_id_foreign
            $table->dropForeign(['dpd_id']);
            $table->dropForeign(['dpc_id']);

            $table->dropColumn([
                'role',
                'status',
                'dpd_id',
                'dpc_id'
            ]);
        });
    }
};
