<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Import Controllers
use App\Http\Controllers\DpdController;
use App\Http\Controllers\DpcController;
use App\Http\Controllers\KaderController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated Routes - SEMUA USER YANG SUDAH LOGIN
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - berbeda berdasarkan role
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Resource Routes - TANPA MIDDLEWARE ROLE DPW
    Route::resource('dpds', DpdController::class)->except(['show']);
    Route::resource('dpcs', DpcController::class)->except(['show']);
    Route::resource('kaders', KaderController::class)->except(['show']);
    Route::resource('admins', AdminController::class)->except(['show']);

    // API Route untuk dashboard
    Route::get('/api/dashboard/stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');
});

require __DIR__ . '/auth.php';
