<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckDpcAccess
{
    /**
     * Handle an incoming request.
     * 
     * Middleware ini memastikan:
     * - Admin DPC hanya bisa akses data di DPC-nya sendiri
     * - Admin DPD hanya bisa akses data di DPD-nya
     * - Super Admin & Admin DPW bisa akses semua
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

        // Admin DPD - hanya bisa akses DPC di DPD-nya
        if ($user->hasRole('admin-dpd')) {
            // Jika ada parameter DPC, cek apakah DPC tersebut milik DPD user
            if ($request->route('dpc')) {
                $dpc = $request->route('dpc');
                if ($dpc->dpd_id !== $user->dpd_id) {
                    abort(403, 'Anda tidak memiliki akses ke DPC ini.');
                }
            }
            return $next($request);
        }

        // Admin DPC - tidak boleh akses route DPC sama sekali (hanya view)
        if ($user->hasRole('admin-dpc')) {
            // Hanya boleh view, tidak boleh create/edit/delete
            if (!$request->isMethod('GET')) {
                abort(403, 'Anda tidak memiliki akses untuk mengubah data DPC.');
            }
        }

        return $next($request);
    }
}
