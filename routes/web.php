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

// Authenticated Routes - DENGAN ROLE-BASED AUTHORIZATION
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - semua user yang login bisa akses
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Routes - semua user bisa manage profile sendiri
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // API Route untuk dashboard
    Route::get('/api/dashboard/stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');

    // ============================================
    // SUPER ADMIN & ADMIN DPW - Full Access
    // ============================================
    Route::middleware(['role:super-admin|admin-dpw'])->group(function () {
        // DPD Management - hanya Super Admin & Admin DPW
        Route::resource('dpds', DpdController::class)->except(['show']);
        
        // Admin Management - hanya Super Admin & Admin DPW
        Route::resource('admins', AdminController::class)->except(['show']);
    });

    // ============================================
    // ADMIN DPW, ADMIN DPD - Manage DPC & Kader
    // ============================================
    Route::middleware(['role:super-admin|admin-dpw|admin-dpd'])->group(function () {
        // DPC Management
        Route::resource('dpcs', DpcController::class)->except(['show']);
    });

    // ============================================
    // SEMUA ADMIN (DPW, DPD, DPC) - Manage Kader
    // ============================================
    Route::middleware(['role:super-admin|admin-dpw|admin-dpd|admin-dpc'])->group(function () {
        // Kader Management
        Route::resource('kaders', KaderController::class)->except(['show']);
    });

    // ============================================
    // VIEW ONLY ROUTES - Semua role bisa view
    // ============================================
    Route::middleware(['permission:view dpd|view dpc|view kader'])->group(function () {
        // Jika user hanya punya permission view, redirect ke index pages
        // Routes ini sudah di-handle di controller dengan authorization
    });
});

require __DIR__ . '/auth.php';
