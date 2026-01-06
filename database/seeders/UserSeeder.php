<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Dpd;
use App\Models\Dpc;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan ada DPD dan DPC untuk testing
        $dpd = Dpd::first();
        $dpc = Dpc::first();

        // 1. Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@nasdem.com',
            'password' => Hash::make('password'),
            'role' => 'super-admin',
            'status' => 'Aktif',
            'email_verified_at' => now(),
        ]);
        $superAdmin->assignRole('super-admin');
        $this->command->info('✓ Super Admin created: superadmin@nasdem.com');

        // 2. Admin DPW (Provinsi)
        $adminDpw = User::create([
            'name' => 'Admin DPW Aceh',
            'email' => 'dpw@nasdem.com',
            'password' => Hash::make('password'),
            'role' => 'admin-dpw',
            'status' => 'Aktif',
            'email_verified_at' => now(),
        ]);
        $adminDpw->assignRole('admin-dpw');
        $this->command->info('✓ Admin DPW created: dpw@nasdem.com');

        // 3. Admin DPD (Kabupaten/Kota)
        if ($dpd) {
            $adminDpd = User::create([
                'name' => 'Admin DPD ' . $dpd->nama_dpd,
                'email' => 'dpd@nasdem.com',
                'password' => Hash::make('password'),
                'role' => 'admin-dpd',
                'status' => 'Aktif',
                'dpd_id' => $dpd->id,
                'email_verified_at' => now(),
            ]);
            $adminDpd->assignRole('admin-dpd');
            $this->command->info('✓ Admin DPD created: dpd@nasdem.com');
        }

        // 4. Admin DPC (Cabang)
        if ($dpc) {
            $adminDpc = User::create([
                'name' => 'Admin DPC ' . $dpc->nama_dpc,
                'email' => 'dpc@nasdem.com',
                'password' => Hash::make('password'),
                'role' => 'admin-dpc',
                'status' => 'Aktif',
                'dpc_id' => $dpc->id,
                'dpd_id' => $dpc->dpd_id,
                'email_verified_at' => now(),
            ]);
            $adminDpc->assignRole('admin-dpc');
            $this->command->info('✓ Admin DPC created: dpc@nasdem.com');
        }

        // 5. Staff (View Only)
        $staff = User::create([
            'name' => 'Staff NasDem',
            'email' => 'staff@nasdem.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'status' => 'Aktif',
            'email_verified_at' => now(),
        ]);
        $staff->assignRole('staff');
        $this->command->info('✓ Staff created: staff@nasdem.com');

        $this->command->info('');
        $this->command->info('All users created with password: password');
        $this->command->info('');
        $this->command->info('Login credentials:');
        $this->command->info('  Super Admin: superadmin@nasdem.com / password');
        $this->command->info('  Admin DPW:   dpw@nasdem.com / password');
        $this->command->info('  Admin DPD:   dpd@nasdem.com / password');
        $this->command->info('  Admin DPC:   dpc@nasdem.com / password');
        $this->command->info('  Staff:       staff@nasdem.com / password');
    }
}
