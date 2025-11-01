<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// IMPORT DUA CONTROLLER INI
use App\Http\Controllers\DpdController;
use App\Http\Controllers\DpcController;
use App\Htpp\Controllers\KaderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// --- RUTE STANDAR (AUTH) ---
// (Biarkan ini, ini buat Profile, dll)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- RUTE ADMIN (WAJIB LOGIN & ROLE DPW) ---
// (Ini dia yang kita rapikan, Cok!)
Route::middleware(['auth', 'verified', 'role:DPW'])->group(function () {

    // Rute DPD (Kabupaten/Kota)
    Route::resource('dpds', DpdController::class)
        ->except(['show']);

    // Rute DPC (Kecamatan) - JADIKAN RUTE BIASA (TIDAK NESTED)
    // Ini yang akan kita panggil dari sidebar.
    // Nama route: dpcs.index, dpcs.create, dll.
    Route::resource('dpcs', DpcController::class)
        ->except(['show']);

    // Routes untuk kaders
    Route::resource('kaders', \App\Http\Controllers\KaderController::class)->except(['show']);
});

require __DIR__ . '/auth.php';
