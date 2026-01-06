<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckKaderAccess
{
    /**
     * Handle an incoming request.
     * 
     * Middleware ini memastikan:
     * - Admin DPC hanya bisa akses kader di DPC-nya sendiri
     * - Admin DPD hanya bisa akses kader di DPD-nya
     * - Super Admin & Admin DPW bisa akses semua kader
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Super Admin & Admin DPW - full access
        if ($user->hasRole(['super-admin', 'admin-dpw'])) {
            return $next($request);
        }

        // Admin DPD - hanya bisa akses kader di DPD-nya
        if ($user->hasRole('admin-dpd')) {
            // Jika ada parameter kader, cek apakah kader tersebut di DPD user
            if ($request->route('kader')) {
                $kader = $request->route('kader');
                $kader->load('dpc'); // Eager load DPC
                
                if ($kader->dpc->dpd_id !== $user->dpd_id) {
                    abort(403, 'Anda tidak memiliki akses ke kader ini.');
                }
            }
            return $next($request);
        }

        // Admin DPC - hanya bisa akses kader di DPC-nya sendiri
        if ($user->hasRole('admin-dpc')) {
            // Jika ada parameter kader, cek apakah kader tersebut di DPC user
            if ($request->route('kader')) {
                $kader = $request->route('kader');
                
                if ($kader->dpc_id !== $user->dpc_id) {
                    abort(403, 'Anda tidak memiliki akses ke kader ini.');
                }
            }
            return $next($request);
        }

        return $next($request);
    }
}
