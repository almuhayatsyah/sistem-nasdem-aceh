<?php

namespace App\Http\Controllers;

use App\Models\Kader;
use App\Models\Dpc;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class KaderController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $kaders = Kader::with([
      'dpc' => function ($query) {
        $query->select('id', 'nama_dpc', 'dpd_id');
      },
      'dpc.dpd' => function ($query) {
        $query->select('id', 'nama_dpd');
      }
    ])
      ->select(
        'id',
        'dpc_id',
        'nama_lengkap',
        'nik',
        'no_kta',
        'no_hp',
        'email',
        'jabatan',
        'status_keanggotaan',
        'alamat_ktp',
        'tanggal_bergabung'
      )
      ->get();

    return Inertia::render('kader/Index', [
      "kaders" => $kaders
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('kader/Create', [
      'dpcs' => Dpc::select('id', 'nama_dpc')->get()
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
      'jabatan' => 'required|string|max:255',
      'alamat_ktp' => 'required|string',
      'alamat_domisili' => 'nullable|string',
      'no_hp' => 'nullable|string|max:255|unique:kaders,no_hp',
    ]);

    Kader::create($validated);

    return redirect()->route('kaders.index')->with('message', 'Kader baru berhasil ditambahkan!');
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Kader $kader)
  {
    return Inertia::render('kader/Edit', [
      'kader' => $kader,
      'dpcs' => Dpc::select('id', 'nama_dpc')->get()
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

    $kader->update($validated);

    return redirect()->route('kaders.index')->with('message', 'Data kader berhasil diperbarui!');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Kader $kader)
  {
    $kader->delete();
    return redirect()->route('kaders.index')->with('message', 'Data kader berhasil dihapus (diarsip).');
  }
}
