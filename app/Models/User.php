<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles; // <-- WAJIB IMPORT INI

class User extends Authenticatable
{
  use HasFactory, Notifiable, HasRoles; // <-- WAJIB TAMBAH 'HasRoles' DI SINI

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'level',  // <-- Kolom kustom kita
    'dpd_id', // <-- Kolom kustom kita
    'dpc_id', // <-- Kolom kustom kita
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  /**
   * Relasi: Satu Admin (User) MILIK SATU DPD (Opsional)
   */
  public function dpd(): BelongsTo
  {
    return $this->belongsTo(Dpd::class);
  }

  /**
   * Relasi: Satu Admin (User) MILIK SATU DPC (Opsional)
   */
  public function dpc(): BelongsTo
  {
    return $this->belongsTo(Dpc::class);
  }
}
