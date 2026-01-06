<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreateSuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan role super-admin sudah ada
        $role = Role::firstOrCreate(['name' => 'super-admin']);

        // Cek apakah super admin sudah ada
        $existingSuperAdmin = User::whereHas('roles', function ($query) {
            $query->where('name', 'super-admin');
        })->first();

        if ($existingSuperAdmin) {
            $this->command->warn('⚠️  Super Admin sudah ada: ' . $existingSuperAdmin->email);
            $this->command->info('Email: ' . $existingSuperAdmin->email);
            $this->command->info('Gunakan password yang sudah ada atau reset via "php artisan tinker"');
            return;
        }

        // Buat Super Admin baru
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@nasdem.com',
            'password' => Hash::make('password'),
            'level' => 'Super Admin',
            'role' => 'DPW', // Gunakan enum value yang valid
            'status' => 'Aktif',
            'email_verified_at' => now(),
        ]);

        // Assign role Spatie
        $superAdmin->assignRole('super-admin');

        $this->command->info('');
        $this->command->info('✅ Super Admin berhasil dibuat!');
        $this->command->info('');
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->command->info('  LOGIN CREDENTIALS');
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->command->info('  Email    : superadmin@nasdem.com');
        $this->command->info('  Password : password');
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->command->info('');
        $this->command->info('Silakan login ke aplikasi dengan credentials di atas.');
        $this->command->info('');
    }
}
