<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ============================================
        // BUAT PERMISSIONS
        // ============================================
        
        // DPD Permissions
        Permission::create(['name' => 'view dpd']);
        Permission::create(['name' => 'create dpd']);
        Permission::create(['name' => 'edit dpd']);
        Permission::create(['name' => 'delete dpd']);

        // DPC Permissions
        Permission::create(['name' => 'view dpc']);
        Permission::create(['name' => 'create dpc']);
        Permission::create(['name' => 'edit dpc']);
        Permission::create(['name' => 'delete dpc']);

        // Kader Permissions
        Permission::create(['name' => 'view kader']);
        Permission::create(['name' => 'create kader']);
        Permission::create(['name' => 'edit kader']);
        Permission::create(['name' => 'delete kader']);

        // Admin/User Permissions
        Permission::create(['name' => 'view admin']);
        Permission::create(['name' => 'create admin']);
        Permission::create(['name' => 'edit admin']);
        Permission::create(['name' => 'delete admin']);

        // Dashboard & Reports
        Permission::create(['name' => 'view dashboard']);
        Permission::create(['name' => 'view reports']);
        Permission::create(['name' => 'export data']);

        // Activity Log
        Permission::create(['name' => 'view activity log']);

        // ============================================
        // BUAT ROLES & ASSIGN PERMISSIONS
        // ============================================

        // 1. SUPER ADMIN - Full Access
        $superAdmin = Role::create(['name' => 'super-admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // 2. ADMIN DPW (Provinsi) - Manage DPD, view all
        $adminDpw = Role::create(['name' => 'admin-dpw']);
        $adminDpw->givePermissionTo([
            // DPD - Full Access
            'view dpd',
            'create dpd',
            'edit dpd',
            'delete dpd',
            
            // DPC - Full Access
            'view dpc',
            'create dpc',
            'edit dpc',
            'delete dpc',
            
            // Kader - Full Access
            'view kader',
            'create kader',
            'edit kader',
            'delete kader',
            
            // Admin - View & Create only
            'view admin',
            'create admin',
            
            // Dashboard & Reports
            'view dashboard',
            'view reports',
            'export data',
        ]);

        // 3. ADMIN DPD (Kabupaten/Kota) - Manage DPC & Kader di wilayahnya
        $adminDpd = Role::create(['name' => 'admin-dpd']);
        $adminDpd->givePermissionTo([
            // DPD - View only (untuk lihat data induknya)
            'view dpd',
            
            // DPC - Full Access (di wilayahnya)
            'view dpc',
            'create dpc',
            'edit dpc',
            'delete dpc',
            
            // Kader - Full Access (di wilayahnya)
            'view kader',
            'create kader',
            'edit kader',
            'delete kader',
            
            // Admin - View only
            'view admin',
            
            // Dashboard & Reports
            'view dashboard',
            'view reports',
            'export data',
        ]);

        // 4. ADMIN DPC (Cabang) - Manage Kader di DPC-nya saja
        $adminDpc = Role::create(['name' => 'admin-dpc']);
        $adminDpc->givePermissionTo([
            // DPD - View only
            'view dpd',
            
            // DPC - View only (lihat data DPC sendiri)
            'view dpc',
            
            // Kader - Full Access (di DPC-nya saja)
            'view kader',
            'create kader',
            'edit kader',
            'delete kader',
            
            // Dashboard & Reports (limited)
            'view dashboard',
            'view reports',
        ]);

        // 5. STAFF - View Only
        $staff = Role::create(['name' => 'staff']);
        $staff->givePermissionTo([
            'view dpd',
            'view dpc',
            'view kader',
            'view dashboard',
        ]);

        $this->command->info('✓ Roles and Permissions created successfully!');
        $this->command->info('');
        $this->command->info('Roles created:');
        $this->command->info('  - super-admin (Full Access)');
        $this->command->info('  - admin-dpw (Provinsi Level)');
        $this->command->info('  - admin-dpd (Kabupaten/Kota Level)');
        $this->command->info('  - admin-dpc (Cabang Level)');
        $this->command->info('  - staff (View Only)');
    }
}
