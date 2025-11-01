<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kader extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Kolom-kolom yang boleh diisi secara massal (mass assignable).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'dpc_id',
        'nama_lengkap',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'pekerjaan',
        'email',
        'no_kta',
        'tanggal_bergabung',
        'status_keanggotaan',
        'jabatan',
        'alamat_ktp',
        'alamat_domisili',
        'no_hp',
        'foto_profil',
        'scan_ktp',
        'scan_kta',
    ];

    /**
     * Atur tipe data untuk kolom-kolom tertentu.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_bergabung' => 'date',
    ];

    /**
     * Mendefinisikan relasi bahwa Kader ini "milik" satu DPC.
     */
    public function dpc(): BelongsTo
    {
        return $this->belongsTo(Dpc::class);
    }
}
