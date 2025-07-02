<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UpdateUserPhotos extends Command
{
    protected $signature = 'users:update-photos';
    protected $description = 'Mettre à jour les photos des utilisateurs';

    public function handle()
    {
        // Mettre à jour votre utilisateur avec le bon chemin de photo
        $user = User::where('email', 'yacineatmani1080@gmail.com')->first();
        if ($user) {
            $user->update(['photo' => 'profile/photo.jpg']);
            $this->info("Photo mise à jour pour : " . $user->name);
        } else {
            $this->error("Utilisateur non trouvé");
        }

        // Créer l'utilisateur admin s'il n'existe pas
        $admin = User::where('email', 'admin@admin.com')->first();
        if (!$admin) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@admin.com', 
                'password' => bcrypt('password'),
                'email_verified_at' => now()
            ]);
            $this->info("Utilisateur admin créé");
        } else {
            $this->info("Utilisateur admin existe déjà");
        }

        // Lister tous les utilisateurs
        $this->info("Liste des utilisateurs :");
        $users = User::all();
        foreach ($users as $user) {
            $this->line("ID: {$user->id}, Nom: {$user->name}, Email: {$user->email}, Photo: {$user->photo}");
        }

        return 0;
    }
}
