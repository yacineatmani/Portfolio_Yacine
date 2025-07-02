<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Vérifier si l'utilisateur admin existe déjà
        $existingAdmin = User::where('email', 'admin@example.com')->first();
        
        if (!$existingAdmin) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'first_name' => 'Admin',
                'bio' => 'Administrateur du système',
                'email_verified_at' => now(),
            ]);
            
            echo "Utilisateur admin créé avec succès!\n";
            echo "Email: admin@example.com\n";
            echo "Mot de passe: password\n";
        } else {
            echo "L'utilisateur admin existe déjà.\n";
        }
    }
}
