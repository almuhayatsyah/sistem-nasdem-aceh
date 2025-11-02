<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // <-- TAMBAH INI
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, HasRoles; // Trait bawaan, biarkan saja

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'level',
    // --- TAMBAHAN KITA ---
    'role',
    'status',
    'dpd_id',
    'dpc_id',
    // --- BATAS TAMBAHAN ---
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
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed', // (Kalau Laravel 10+, kalau 9 'hashed' gak ada)

    // --- TAMBAHAN KITA ---
    'role' => 'string',
    'status' => 'string',
    // --- BATAS TAMBAHAN ---
  ];


  // =================================================================
  // --- RELASI BARU UNTUK ADMIN ---
  // =================================================================

  /**
   * Relasi: Admin ini 'milik' DPD mana (jika dia Admin DPD).
   */
  public function dpd(): BelongsTo
  {
    // Parameter: (Model Tujuan, Foreign Key di tabel 'users' ini)
    return $this->belongsTo(Dpd::class, 'dpd_id');
  }

  /**
   * Relasi: Admin ini 'milik' DPC mana (jika dia Admin DPC).
   */
  public function dpc(): BelongsTo
  {
    // Parameter: (Model Tujuan, Foreign Key di tabel 'users' ini)
    return $this->belongsTo(Dpc::class, 'dpc_id');
  }
}
