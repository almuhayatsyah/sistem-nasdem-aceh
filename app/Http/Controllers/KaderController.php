<?php

namespace App\Http\Controllers;

use App\Models\Kader;
use App\Models\Dpc;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class KaderController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    try {
      $user = auth()->user();
      
      $query = Kader::with([
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
        );

      // Filter berdasarkan role
      if ($user->hasRole('admin-dpd')) {
        // Admin DPD hanya lihat kader di DPD-nya
        $query->whereHas('dpc', function ($q) use ($user) {
          $q->where('dpd_id', $user->dpd_id);
        });
      } elseif ($user->hasRole('admin-dpc')) {
        // Admin DPC hanya lihat kader di DPC-nya
        $query->where('dpc_id', $user->dpc_id);
      }
      // Super Admin & Admin DPW lihat semua (no filter)

      // Handle search query
      if ($request->has('q') && $request->q) {
        $search = $request->q;
        $query->where(function ($q) use ($search) {
          $q->where('nama_lengkap', 'like', "%{$search}%")
            ->orWhere('nik', 'like', "%{$search}%")
            ->orWhere('no_kta', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%")
            ->orWhere('no_hp', 'like', "%{$search}%")
            ->orWhere('jabatan', 'like', "%{$search}%")
            ->orWhere('status_keanggotaan', 'like', "%{$search}%")
            ->orWhereHas('dpc', function ($q) use ($search) {
              $q->where('nama_dpc', 'like', "%{$search}%");
            })
            ->orWhereHas('dpc.dpd', function ($q) use ($search) {
              $q->where('nama_dpd', 'like', "%{$search}%");
            });
        });
      }

      $kaders = $query->get();

      return Inertia::render('kader/Index', [
        "kaders" => $kaders->toArray(),
        "filters" => $request->has('q') ? $request->only(['q']) : []
      ]);
    } catch (\Exception $e) {
      Log::error('Error in KaderController@index: ' . $e->getMessage());

      return Inertia::render('kader/Index', [
        "kaders" => [],
        "filters" => $request->has('q') ? $request->only(['q']) : [],
        "error" => "Terjadi kesalahan saat memuat data kader."
      ]);
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $user = auth()->user();
    
    // Query untuk DPC
    $query = Dpc::select('id', 'nama_dpc', 'dpd_id');
    
    // Filter berdasarkan role
    if ($user->hasRole('admin-dpd')) {
      // Admin DPD hanya bisa buat kader di DPC yang ada di DPD-nya
      $query->where('dpd_id', $user->dpd_id);
    } elseif ($user->hasRole('admin-dpc')) {
      // Admin DPC hanya bisa buat kader di DPC-nya sendiri
      $query->where('id', $user->dpc_id);
    }
    // Super Admin & Admin DPW bisa pilih semua DPC
    
    return Inertia::render('kader/Create', [
      'dpcs' => $query->get()
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
    $user = auth()->user();
    
    // Query untuk DPC
    $query = Dpc::select('id', 'nama_dpc', 'dpd_id');
    
    // Filter berdasarkan role
    if ($user->hasRole('admin-dpd')) {
      $query->where('dpd_id', $user->dpd_id);
    } elseif ($user->hasRole('admin-dpc')) {
      $query->where('id', $user->dpc_id);
    }
    
    return Inertia::render('kader/Edit', [
      'kader' => $kader,
      'dpcs' => $query->get()
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
