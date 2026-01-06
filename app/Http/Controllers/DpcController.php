<?php

namespace App\Http\Controllers;

use App\Models\Dpd; // <-- WAJIB IMPORT DPD
use App\Models\Dpc; // <-- WAJIB IMPORT DPC
use Illuminate\Http\Request;
use Inertia\Inertia; // <-- WAJIB IMPORT INERTIA
use Illuminate\Validation\Rule; // <-- Tambahkan ini untuk validasi

class DpcController extends Controller
{
    /**
     * Display a listing of the resource.
     * Rute: dpcs (GET) - Dipanggil dari Sidebar
     */
    public function index()
    {
        $user = auth()->user();
        
        // Query builder untuk DPC
        $query = Dpc::with('dpd')
            ->withCount('kaders')
            ->withCount('users');
        
        // Filter berdasarkan role
        if ($user->hasRole('admin-dpd')) {
            // Admin DPD hanya lihat DPC di DPD-nya
            $query->where('dpd_id', $user->dpd_id);
        } elseif ($user->hasRole('admin-dpc')) {
            // Admin DPC hanya lihat DPC-nya sendiri
            $query->where('id', $user->dpc_id);
        }
        // Super Admin & Admin DPW lihat semua (no filter)
        
        $dpcs = $query->get();

        return Inertia::render('Dpc/Index', [
            'dpcs' => $dpcs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Rute: dpcs/create (GET)
     */
    public function create()
    {
        $user = auth()->user();
        
        // Query untuk DPD
        $query = Dpd::orderBy('nama_dpd', 'asc');
        
        // Filter berdasarkan role
        if ($user->hasRole('admin-dpd')) {
            // Admin DPD hanya bisa buat DPC di DPD-nya
            $query->where('id', $user->dpd_id);
        }
        // Super Admin & Admin DPW bisa pilih semua DPD
        
        $dpds = $query->get(['id', 'nama_dpd']);

        return Inertia::render('Dpc/Create', [
            'dpds' => $dpds,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Rute: dpcs (POST)
     */
    public function store(Request $request) // <-- KITA HAPUS (Dpd $dpd)
    {
        $validated = $request->validate([
            // Validasi DPD_ID jadi wajib ada dari form
            'dpd_id'     => 'required|exists:dpds,id',
            'nama_dpc'   => [
                'required',
                'string',
                'max:255',
                // Pastikan nama DPC unik UNTUK DPD_ID YANG DIPILIH
                Rule::unique('dpcs')->where(function ($query) use ($request) {
                    return $query->where('dpd_id', $request->dpd_id);
                }),
            ],
            'alamat'     => 'nullable|string',
            'telepon'    => 'nullable|string|max:20',
            'email'      => 'nullable|email|max:255',
            'ketua'      => 'nullable|string|max:255',
            'sekretaris' => 'nullable|string|max:255',
            'bendahara'  => 'nullable|string|max:255',
            'status'     => 'required|string|in:active,inactive',
        ]);

        // Simpan data DPC (cara biasa, karena 'dpd_id' sudah ada di $validated)
        Dpc::create($validated);

        // Redirect ke halaman index DPC (bukan nested)
        return redirect()->route('dpcs.index')->with('message', 'DPC baru berhasil ditambahkan!');
    }

    // Kita GAK PAKAI show()

    /**
     * Show the form for editing the specified resource.
     * Rute: dpcs/{dpc}/edit (GET)
     */
    public function edit(Dpc $dpc) // <-- KITA HAPUS (Dpd $dpd)
    {
        // Ambil semua DPD untuk dropdown (kalau mau ganti induk)
        $dpds = Dpd::orderBy('nama_dpd', 'asc')->get(['id', 'nama_dpd']);

        return Inertia::render('Dpc/Edit', [
            'dpds' => $dpds, // Kirim semua DPD
            'dpc'  => $dpc,  // Kirim DPC yang mau di-edit
            // 'dpd' => $dpd, <-- Kita hapus
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Rute: dpcs/{dpc} (PUT/PATCH)
     */
    public function update(Request $request, Dpc $dpc) // <-- KITA HAPUS (Dpd $dpd)
    {
        $validated = $request->validate([
            'dpd_id'     => 'required|exists:dpds,id',
            'nama_dpc'   => [
                'required',
                'string',
                'max:255',
                // Validasi unik, kecuali untuk ID DPC ini sendiri
                Rule::unique('dpcs')->where(function ($query) use ($request) {
                    return $query->where('dpd_id', $request->dpd_id);
                })->ignore($dpc->id),
            ],
            'alamat'     => 'nullable|string',
            'telepon'    => 'nullable|string|max:20',
            'email'      => 'nullable|email|max:255',
            'ketua'      => 'nullable|string|max:255',
            'sekretaris' => 'nullable|string|max:255',
            'bendahara'  => 'nullable|string|max:255',
            'status'     => 'required|string|in:active,inactive',
        ]);

        $dpc->update($validated);

        return redirect()->route('dpcs.index')->with('message', 'Data DPC berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     * Rute: dpcs/{dpc} (DELETE)
     */
    public function destroy(Dpc $dpc) // <-- KITA HAPUS (Dpd $dpd)
    {
        $dpc->delete();
        return redirect()->route('dpcs.index')->with('message', 'Data DPC berhasil dihapus!');
    }
}
