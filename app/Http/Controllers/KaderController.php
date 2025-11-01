<?php

namespace App\Http\Controllers;

use App\Models\Kader;
use App\Models\Dpc; // <-- Penting untuk form
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule; // <-- Penting untuk validasi update
use Illuminate\Support\Facades\Storage; // <-- Untuk upload file nanti

class KaderController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $kaders = Kader::with([
      'dpc' => function ($query) {
        $query->select('id', 'nama_dpc', 'dpd_id'); // Ambil DPC
      },
      'dpc.dpd' => function ($query) {
        $query->select('id', 'nama_dpd'); // Ambil DPD
      }
    ])
      ->select( // Pilih kolom yang perlu aja biar ringan
        'id',
        'dpc_id',
        'nama_lengkap',
        'nik',
        'no_kta',
        'no_hp',
        'email',
        'jabatan',
        'status_keanggotaan'
      )
      ->get();

    return Inertia::render('Kader/Index', [
      'kaders' => $kaders
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Kader/Create', [
      'dpcs' => Dpc::select('id', 'nama_dpc')->get() // Kirim daftar DPC ke form
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'dpc_id' => 'required|exists:dpcs,id',
      'nama_lengkap' => 'required|string|max:255',
      'nik' => 'required|string|max:255|unique:kaders,nik',
      'tempat_lahir' => 'required|string|max:255',
      'tanggal_lahir' => 'required|date',
      'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
      'agama' => 'nullable|string|max:255',
      'pekerjaan' => 'nullable|string|max:255',
      'email' => 'nullable|email|max:255|unique:kaders,email',
      'no_kta' => 'required|string|max:255|unique:kaders,no_kta',
      'tanggal_bergabung' => 'nullable|date',
      'status_keanggotaan' => 'required|in:Aktif,Tidak Aktif,Meninggal Dunia,Pindah,Dipecat',
      'jabatan' => 'required|string|max:255|default:Anggota Biasa',
      'alamat_ktp' => 'required|string',
      'alamat_domisili' => 'nullable|string',
      'no_hp' => 'nullable|string|max:255|unique:kaders,no_hp',

      // Nanti kita urus upload-nya
      // 'foto_profil' => 'nullable|image|max:2048', 
      // 'scan_ktp' => 'nullable|image|max:2048',
      // 'scan_kta' => 'nullable|image|max:2048',
    ]);

    // Belum urus upload file
    Kader::create($validated);

    return redirect()->route('kaders.index')->with('message', 'Kader baru berhasil ditambahkan!');
  }


  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Kader $kader)
  {
    return Inertia::render('Kader/Edit', [
      'kader' => $kader, // Kirim data kader yang mau diedit
      'dpcs' => Dpc::select('id', 'nama_dpc')->get() // Kirim daftar DPC
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Kader $kader)
  {
    $validated = $request->validate([
      'dpc_id' => 'required|exists:dpcs,id',
      'nama_lengkap' => 'required|string|max:255',
      'nik' => ['required', 'string', 'max:255', Rule::unique('kaders')->ignore($kader->id)],
      'tempat_lahir' => 'required|string|max:255',
      'tanggal_lahir' => 'required|date',
      'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
      'agama' => 'nullable|string|max:255',
      'pekerjaan' => 'nullable|string|max:255',
      'email' => ['nullable', 'email', 'max:255', Rule::unique('kaders')->ignore($kader->id)],
      'no_kta' => ['required', 'string', 'max:255', Rule::unique('kaders')->ignore($kader->id)],
      'tanggal_bergabung' => 'nullable|date',
      'status_keanggotaan' => 'required|in:Aktif,Tidak Aktif,Meninggal Dunia,Pindah,Dipecat',
      'jabatan' => 'required|string|max:255',
      'alamat_ktp' => 'required|string',
      'alamat_domisili' => 'nullable|string',
      'no_hp' => ['nullable', 'string', 'max:255', Rule::unique('kaders')->ignore($kader->id)],
    ]);

    // Belum urus upload file
    $kader->update($validated);

    return redirect()->route('kaders.index')->with('message', 'Data kader berhasil diperbarui!');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Kader $kader)
  {
    $kader->delete(); // Ini akan jadi soft delete
    return redirect()->route('kaders.index')->with('message', 'Data kader berhasil dihapus (diarsip).');
  }
}
