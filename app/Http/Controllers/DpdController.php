<?php

namespace App\Http\Controllers;

use App\Models\Dpd; // <-- Pastikan 'use'
use Illuminate\Http\Request;
use Inertia\Inertia;

class DpdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // --- INI PERUBAHANNYA ---
        // Kita ambil DPD, sekaligus kita HITUNG relasinya
        $dpds = Dpd::withCount([
            'dpcs',     // -> jadi dpcs_count
            'kaders',   // -> jadi kaders_count (dari relasi pintar)
            'users'     // -> jadi users_count (dari relasi pintar)
        ])->get();
        // --- BATAS PERUBAHAN ---

        return Inertia::render('Dpd/Index', [
            'dpds' => $dpds
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dpd/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_dpd'   => 'required|string|max:255|unique:dpds,nama_dpd',
            'lokasi'     => 'required|string|max:255',
            'alamat'     => 'nullable|string',
            'telepon'    => 'nullable|string|max:20',
            'email'      => 'nullable|email|max:255',
            'ketua'      => 'nullable|string|max:255',
            'sekretaris' => 'nullable|string|max:255',
            'bendahara'  => 'nullable|string|max:255',
            'status'     => 'required|string|in:active,inactive',
        ]);

        Dpd::create($validated);

        return redirect()->route('dpds.index')->with('message', 'DPD baru berhasil ditambahkan!');
    }

    // Kita GAK PAKAI show()

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dpd $dpd)
    {
        return Inertia::render('Dpd/Edit', [
            'dpd' => $dpd
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dpd $dpd)
    {
        $validated = $request->validate([
            'nama_dpd'   => 'required|string|max:255|unique:dpds,nama_dpd,' . $dpd->id,
            'lokasi'     => 'required|string|max:255',
            'alamat'     => 'nullable|string',
            'telepon'    => 'nullable|string|max:20',
            'email'      => 'nullable|email|max:255',
            'ketua'      => 'nullable|string|max:255',
            'sekretaris' => 'nullable|string|max:255',
            'bendahara'  => 'nullable|string|max:255',
            'status'     => 'required|string|in:active,inactive',
        ]);

        $dpd->update($validated);

        return redirect()->route('dpds.index')->with('message', 'Data DPD berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dpd $dpd)
    {
        // Hati-hati: Nanti harus ada logika hapus DPC bawahannya dulu
        $dpd->delete();
        return redirect()->route('dpds.index')->with('message', 'Data DPD berhasil dihapus!');
    }
}
