<?php

namespace App\Http\Controllers;

use App\Models\Dpd;
use App\Models\Dpc;
use App\Models\Kader;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
  public function index()
  {
    // Total counts
    $totalDpd = Dpd::count();
    $totalDpc = Dpc::count();
    $totalKader = Kader::count();
    $totalAdmin = User::count();

    // Status kader
    $kaderAktif = Kader::where('status_keanggotaan', 'Aktif')->count();
    $kaderNonAktif = Kader::where('status_keanggotaan', '!=', 'Aktif')->count();

    // Status admin
    $adminAktif = User::where('status', 'Aktif')->count();
    $adminNonAktif = User::where('status', 'Nonaktif')->count();

    // 5 DPD dengan kader terbanyak
    $topDpd = Dpd::withCount(['kaders as total_kader' => function ($query) {
      $query->where('status_keanggotaan', 'Aktif');
    }])
      ->orderByDesc('total_kader')
      ->limit(5)
      ->get(['id', 'nama_dpd', 'total_kader']);

    // Data untuk chart DPD dengan kader terbanyak
    $dpdChartData = $topDpd->map(function ($dpd) {
      return [
        'nama_dpd' => $dpd->nama_dpd,
        'total_kader' => $dpd->total_kader,
      ];
    });

    // Distribusi kader per DPD (untuk pie chart)
    $kaderPerDpd = Dpd::withCount(['kaders as total_kader'])
      ->having('total_kader', '>', 0)
      ->orderByDesc('total_kader')
      ->get(['id', 'nama_dpd', 'total_kader']);

    // Statistik kader berdasarkan jabatan
    $jabatanStats = Kader::select('jabatan', DB::raw('COUNT(*) as total'))
      ->groupBy('jabatan')
      ->orderByDesc('total')
      ->get();

    // Statistik kader berdasarkan status
    $statusStats = Kader::select('status_keanggotaan', DB::raw('COUNT(*) as total'))
      ->groupBy('status_keanggotaan')
      ->get();

    // Recent activities - kader terbaru
    $recentKaders = Kader::with(['dpc.dpd'])
      ->orderBy('created_at', 'desc')
      ->limit(5)
      ->get(['id', 'nama_lengkap', 'dpc_id', 'status_keanggotaan', 'created_at']);

    // Recent activities - admin terbaru
    $recentAdmins = User::with(['dpd', 'dpc'])
      ->orderBy('created_at', 'desc')
      ->limit(5)
      ->get(['id', 'name', 'email', 'role', 'status', 'created_at']);

    return Inertia::render('Dashboard', [
      // Statistik utama
      'statistics' => [
        'total_dpd' => $totalDpd,
        'total_dpc' => $totalDpc,
        'total_kader' => $totalKader,
        'total_admin' => $totalAdmin,
        'kader_aktif' => $kaderAktif,
        'kader_non_aktif' => $kaderNonAktif,
        'admin_aktif' => $adminAktif,
        'admin_non_aktif' => $adminNonAktif,
      ],

      // Data untuk charts
      'charts' => [
        'top_dpd' => $dpdChartData,
        'kader_per_dpd' => $kaderPerDpd,
        'jabatan_stats' => $jabatanStats,
        'status_stats' => $statusStats,
      ],

      // Aktivitas terbaru
      'recent_activities' => [
        'kaders' => $recentKaders,
        'admins' => $recentAdmins,
      ],

      // Summary data untuk cards
      'summary' => [
        'kader_by_gender' => [
          'laki_laki' => Kader::where('jenis_kelamin', 'Laki-laki')->count(),
          'perempuan' => Kader::where('jenis_kelamin', 'Perempuan')->count(),
        ],
        'kader_by_role' => [
          'anggota_biasa' => Kader::where('jabatan', 'Anggota Biasa')->count(),
          'jabatan_struktural' => Kader::where('jabatan', '!=', 'Anggota Biasa')->count(),
        ],
      ]
    ]);
  }

  // Method untuk data real-time (opsional, untuk auto-refresh)
  public function getStats()
  {
    $totalDpd = Dpd::count();
    $totalDpc = Dpc::count();
    $totalKader = Kader::count();
    $totalAdmin = User::count();

    return response()->json([
      'total_dpd' => $totalDpd,
      'total_dpc' => $totalDpc,
      'total_kader' => $totalKader,
      'total_admin' => $totalAdmin,
      'updated_at' => now()->format('Y-m-d H:i:s'),
    ]);
  }
}
