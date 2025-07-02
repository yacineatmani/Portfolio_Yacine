<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class DiagnosePortfolio extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'portfolio:diagnose';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Diagnostique les problèmes du portfolio';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== DIAGNOSTIC PORTFOLIO ===');
        
        // 1. Vérifier l'utilisateur
        $user = User::first();
        if (!$user) {
            $this->error('❌ Aucun utilisateur trouvé');
            return;
        }
        
        $this->info("✅ Utilisateur trouvé: {$user->name} (ID: {$user->id})");
        
        // 2. Vérifier la photo
        $this->info("\n--- PHOTO DE PROFIL ---");
        if ($user->photo) {
            $this->info("Photo DB: {$user->photo}");
            $photoPath = storage_path('app/public/' . $user->photo);
            $photoExists = file_exists($photoPath);
            $this->info("Fichier existe: " . ($photoExists ? '✅ Oui' : '❌ Non'));
            if ($photoExists) {
                $size = filesize($photoPath);
                $this->info("Taille: " . round($size / 1024, 2) . " KB");
            }
        } else {
            $this->warn("❌ Aucune photo définie");
        }
        
        // 3. Vérifier le CV
        $this->info("\n--- CV ---");
        if ($user->cv) {
            $this->info("CV DB: {$user->cv}");
            $cvPath = storage_path('app/public/' . $user->cv);
            $cvExists = file_exists($cvPath);
            $this->info("Fichier existe: " . ($cvExists ? '✅ Oui' : '❌ Non'));
            if ($cvExists) {
                $size = filesize($cvPath);
                $this->info("Taille: " . round($size / 1024, 2) . " KB");
            }
        } else {
            $this->warn("❌ Aucun CV défini");
        }
        
        // 4. Vérifier les projets
        $this->info("\n--- PROJETS ---");
        $projects = $user->projects()->get();
        $this->info("Nombre de projets: " . $projects->count());
        
        foreach ($projects as $project) {
            $this->info("- {$project->title}");
            if ($project->image) {
                $imagePath = storage_path('app/public/' . $project->image);
                $imageExists = file_exists($imagePath);
                $this->info("  Image: {$project->image} " . ($imageExists ? '✅' : '❌'));
            }
        }
        
        // 5. Vérifier les compétences
        $this->info("\n--- COMPÉTENCES ---");
        $skills = $user->skills()->get();
        $this->info("Nombre de compétences: " . $skills->count());
        
        // 6. Vérifier le lien symbolique
        $this->info("\n--- STORAGE ---");
        $storageLink = public_path('storage');
        $linkExists = is_link($storageLink) || is_dir($storageLink);
        $this->info("Lien symbolique: " . ($linkExists ? '✅ Exists' : '❌ Missing'));
        
        // 7. Vérifier les URLs
        $this->info("\n--- URLS DE TEST ---");
        $this->info("Page d'accueil: http://localhost:8000");
        $this->info("Admin: http://localhost:8000/admin");
        $this->info("CV: http://localhost:8000/cv/download");
        if ($user->photo) {
            $this->info("Photo: http://localhost:8000/storage/{$user->photo}");
        }
        
        $this->info("\n=== DIAGNOSTIC TERMINÉ ===");
    }
}
