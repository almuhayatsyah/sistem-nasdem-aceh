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
        Schema::create('kaders', function (Blueprint $table) {
            $table->id();

            // 1. Kunci & Relasi (Wajib)
            $table->foreignId('dpc_id')
                ->constrained('dpcs')
                ->onDelete('cascade'); // Jika DPC dihapus, kadernya ikut terhapus

            // 2. Data Diri (Sesuai kesepakatan)
            $table->string('nama_lengkap');
            $table->string('nik')->unique(); // NIK unik
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('agama')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->string('email')->unique()->nullable(); // Email unik

            // 3. Info Keanggotaan (Wajib)
            $table->string('no_kta')->unique(); // No KTA unik
            $table->date('tanggal_bergabung')->nullable();
            $table->enum('status_keanggotaan', [
                'Aktif',
                'Tidak Aktif',
                'Meninggal Dunia',
                'Pindah',
                'Dipecat'
            ])->default('Aktif');
            $table->string('jabatan')->default('Anggota Biasa');

            // 4. Kontak & Alamat (Wajib)
            $table->text('alamat_ktp');
            $table->text('alamat_domisili')->nullable(); // Boleh kosong jika sama
            $table->string('no_hp')->unique()->nullable(); // No HP unik

            // 5. File Pendukung (Opsional)
            $table->string('foto_profil')->nullable();
            $table->string('scan_ktp')->nullable();
            $table->string('scan_kta')->nullable();

            // Timestamps
            $table->timestamps(); // Buat created_at & updated_at
            $table->softDeletes(); // Buat deleted_at (untuk arsip)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kaders');
    }
};
