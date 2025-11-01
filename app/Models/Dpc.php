<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- Jangan lupa import ini
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // <-- Import buat relasi BelongsTo
use Illuminate\Database\Eloquent\Relations\HasMany;   // <-- Import buat relasi HasMany

class Dpc extends Model
{
    use HasFactory; // <-- Panggil trait-nya

    /**
     * Kolom yang boleh diisi massal (WAJIB ADA biar create() bisa jalan).
     * Sesuaikan dengan field di form Create.jsx dan migrasi baru
     */
    protected $fillable = [
        'dpd_id',       // <-- Kunci ke induknya (DPD)
        'nama_dpc',
        'alamat',
        'telepon',
        'email',
        'ketua',
        'sekretaris',
        'bendahara',
        'status',
    ];

    /**
     * Relasi: Satu DPC MILIK SATU DPD.
     * Ini penting buat tau DPC ini punya DPD mana.
     */
    public function dpd(): BelongsTo // <-- Nama methodnya tunggal (dpd)
    {
        // Nyambung ke Model Dpd
        return $this->belongsTo(Dpd::class);
    }

    /**
     * Relasi: Satu DPC punya BANYAK Kader.
     */
    public function kaders(): HasMany // <-- Nama methodnya jamak (kaders)
    {
        // Nyambung ke Model Kader
        return $this->hasMany(Kader::class);
    }

    /**
     * Relasi: Satu DPC punya BANYAK Admin (User level DPC).
     * Ini buat nanti kalau kau kembangin hak akses DPC.
     */
    public function users(): HasMany // <-- Nama methodnya jamak (users)
    {
        // Nyambung ke Model User
        return $this->hasMany(User::class);
    }
}
