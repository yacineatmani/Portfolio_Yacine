<?php

namespace App\Console\Commands;

use App\Models\Project;
use App\Models\User;
use Illuminate\Console\Command;

class DebugImages extends Command
{
    protected $signature = 'debug:images';
    protected $description = 'Debug les images des projets et utilisateurs';

    public function handle()
    {
        $this->info("=== DEBUG DES IMAGES ===");
        
        // Vérifier les projets
        $this->info("\n--- PROJETS ---");
        $projects = Project::all();
        foreach ($projects as $project) {
            $this->line("ID: {$project->id}");
            $this->line("Titre: {$project->title}");
            $this->line("Image: " . ($project->image ?? 'NULL'));
            if ($project->image) {
                $imagePath = storage_path('app/public/' . $project->image);
                $publicPath = public_path('storage/' . $project->image);
                $this->line("Chemin storage: " . ($imagePath ?? 'NULL'));
                $this->line("Existe storage: " . (file_exists($imagePath) ? 'OUI' : 'NON'));
                $this->line("Chemin public: " . ($publicPath ?? 'NULL'));
                $this->line("Existe public: " . (file_exists($publicPath) ? 'OUI' : 'NON'));
            }
            $this->line("---");
        }
        
        // Vérifier les utilisateurs
        $this->info("\n--- UTILISATEURS ---");
        $users = User::all();
        foreach ($users as $user) {
            $this->line("ID: {$user->id}");
            $this->line("Nom: {$user->name}");
            $this->line("Email: {$user->email}");
            $this->line("Photo: " . ($user->photo ?? 'NULL'));
            if ($user->photo) {
                $photoPath = storage_path('app/public/' . $user->photo);
                $publicPath = public_path('storage/' . $user->photo);
                $this->line("Chemin storage: " . ($photoPath ?? 'NULL'));
                $this->line("Existe storage: " . (file_exists($photoPath) ? 'OUI' : 'NON'));
                $this->line("Chemin public: " . ($publicPath ?? 'NULL'));
                $this->line("Existe public: " . (file_exists($publicPath) ? 'OUI' : 'NON'));
            }
            $this->line("---");
        }
        
        // Lister les fichiers dans storage
        $this->info("\n--- FICHIERS DANS STORAGE/APP/PUBLIC ---");
        $storagePath = storage_path('app/public');
        if (is_dir($storagePath)) {
            $files = scandir($storagePath);
            foreach ($files as $file) {
                if ($file !== '.' && $file !== '..') {
                    $this->line($file);
                }
            }
        }
        
        return 0;
    }
}
