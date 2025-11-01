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
    public function index() // <-- KITA HAPUS (Dpd $dpd)
    {
        // Ambil SEMUA DPC, bukan cuma dari 1 DPD
        $dpcs = Dpc::with('dpd') // Ambil data induk DPD-nya (buat tabel)
            ->withCount('kaders') // HITUNG kadernya
            ->withCount('users')  // HITUNG adminnya
            ->get(); // Ambil datanya

        return Inertia::render('Dpc/Index', [
            // 'dpd' => $dpd, <-- Kita hapus, karena ini halaman semua DPC
            'dpcs' => $dpcs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Rute: dpcs/create (GET)
     */
    public function create() // <-- KITA HAPUS (Dpd $dpd)
    {
        // Karena kita gak tau mau buat DPC untuk DPD mana,
        // kita ambil SEMUA DPD untuk jadi pilihan dropdown di form.
        $dpds = Dpd::orderBy('nama_dpd', 'asc')->get(['id', 'nama_dpd']);

        return Inertia::render('Dpc/Create', [
            // 'dpd' => $dpd, <-- Kita ganti
            'dpds' => $dpds, // <-- Kirim semua DPD
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
