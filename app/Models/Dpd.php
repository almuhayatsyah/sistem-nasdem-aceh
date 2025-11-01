<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dpd extends Model
{
    use HasFactory;

    // Izinkan kolom ini diisi massal (waktu create/update)
    protected $fillable = [
        'nama_dpd',
        'lokasi', // Misal: Kabupaten Deli Serdang
        'alamat',
        'telepon',
        'email',
        'ketua',
        'sekretaris',
        'bendahara',
        'status', // 'active', 'inactive'
    ];

    /**
     * Relasi: Satu DPD punya BANYAK DPC.
     */
    public function dpcs()
    {
        // Model Dpc, foreign key 'dpd_id', local key 'id'
        return $this->hasMany(Dpc::class);
    }

    /**
     * RELASI PINTAR (Has Many Through):
     * Ambil semua KADER dari DPC-DPC yang ada di bawah DPD ini.
     */
    public function kaders()
    {
        // (Model tujuan, Model perantara)
        return $this->hasManyThrough(Kader::class, Dpc::class);
    }

    /**
     * RELASI PINTAR (Has Many Through):
     * Ambil semua USER/ADMIN dari DPC-DPC yang ada di bawah DPD ini.
     */
    public function users()
    {
        // (Model tujuan, Model perantara)
        return $this->hasManyThrough(User::class, Dpc::class);
    }
}
