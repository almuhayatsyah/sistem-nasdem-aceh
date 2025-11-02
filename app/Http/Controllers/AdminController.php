<?php

namespace App\Http\Controllers;

use App\Models\Dpd;
use App\Models\Dpc;
use App\Models\User; // <-- Kita pakai Model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class AdminController extends Controller
{
  /**
   * Display a listing of the resource.
   * Nampilkan halaman tabel Admin
   */
  public function index()
  {
    // Ambil semua user, sekalian data DPD dan DPC nya
    $admins = User::with(['dpd', 'dpc'])
      // ->orderBy('role') // Nanti bisa di-sort
      ->get();

    return Inertia::render('Admin/Index', [
      'admins' => $admins
    ]);
  }

  /**
   * Show the form for creating a new resource.
   * Nampilkan form tambah Admin
   */
  public function create()
  {
    // Kita butuh data DPD dan DPC untuk dropdown
    return Inertia::render('Admin/Create', [
      'dpds' => Dpd::all(['id', 'nama_dpd']),
      'dpcs' => Dpc::all(['id', 'nama_dpc']),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   * Nyimpan Admin baru
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:' . User::class,
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
      'role' => 'required|string|in:DPW,Admin DPD,Admin DPC',
      'status' => 'required|string|in:Aktif,Nonaktif',

      // Wajib diisi HANYA JIKA role nya 'Admin DPD'
      'dpd_id' => 'nullable|required_if:role,Admin DPD|exists:dpds,id',

      // Wajib diisi HANYA JIKA role nya 'Admin DPC'
      'dpc_id' => 'nullable|required_if:role,Admin DPC|exists:dpcs,id',
    ]);

    User::create([
      'level' => 'admin',
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'role' => $request->role,
      'status' => $request->status,
      'dpd_id' => $request->role == 'Admin DPD' ? $request->dpd_id : null,
      'dpc_id' => $request->role == 'Admin DPC' ? $request->dpc_id : null,
    ]);

    return redirect()->route('admins.index')->with('message', 'Admin baru berhasil ditambahkan.');
  }

  /**
   * Display the specified resource.
   * (Kita gak pakai show)
   */
  // public function show(User $user) {}

  /**
   * Show the form for editing the specified resource.
   * Nampilkan form edit
   */
  public function edit(User $admin) // <-- Kita terima $admin (nama alias dari $user)
  {
    // Kirim data admin yg mau diedit, dan data DPD/DPC untuk dropdown
    return Inertia::render('Admin/Edit', [
      'admin' => $admin,
      'dpds' => Dpd::all(['id', 'nama_dpd']),
      'dpcs' => Dpc::all(['id', 'nama_dpc']),
    ]);
  }

  /**
   * Update the specified resource in storage.
   * Update data Admin
   */
  public function update(Request $request, User $admin)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:' . User::class . ',email,' . $admin->id,
      'role' => 'required|string|in:DPW,Admin DPD,Admin DPC',
      'status' => 'required|string|in:Aktif,Nonaktif',
      'dpd_id' => 'nullable|required_if:role,Admin DPD|exists:dpds,id',
      'dpc_id' => 'nullable|required_if:role,Admin DPC|exists:dpcs,id',

      // Password gak wajib diisi pas update
      'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
    ]);

    // Update data dasarnya
    $admin->update([
      'name' => $request->name,
      'email' => $request->email,
      'role' => $request->role,
      'status' => $request->status,
      'dpd_id' => $request->role == 'Admin DPD' ? $request->dpd_id : null,
      'dpc_id' => $request->role == 'Admin DPC' ? $request->dpc_id : null,
    ]);

    // Cek kalau password diisi, baru update password
    if ($request->filled('password')) {
      $admin->update([
        'password' => Hash::make($request->password)
      ]);
    }

    return redirect()->route('admins.index')->with('message', 'Data Admin berhasil diperbarui.');
  }

  /**
   * Remove the specified resource from storage.
   * Hapus Admin
   */
  public function destroy(User $admin)
  {
    // Hati-hati: Jangan sampai user hapus akunnya sendiri
    if ($admin->id === auth()->id()) {
      return redirect()->route('admins.index')->with('error', 'Anda tidak bisa menghapus akun Anda sendiri.');
    }

    $admin->delete();
    return redirect()->route('admins.index')->with('message', 'Data Admin berhasil dihapus.');
  }
}
