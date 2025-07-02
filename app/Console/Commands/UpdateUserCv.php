<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UpdateUserCv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:cv {user_id?} {--remove}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gère le CV d\'un utilisateur';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userId = $this->argument('user_id') ?? 1;
        $user = User::find($userId);

        if (!$user) {
            $this->error("Utilisateur avec l'ID {$userId} introuvable.");
            return;
        }

        if ($this->option('remove')) {
            // Supprimer le CV
            if ($user->cv) {
                Storage::disk('public')->delete($user->cv);
                $user->cv = null;
                $user->save();
                $this->info("CV supprimé pour l'utilisateur {$user->name}.");
            } else {
                $this->info("Aucun CV à supprimer pour l'utilisateur {$user->name}.");
            }
            return;
        }

        // Afficher le statut actuel
        $this->info("Utilisateur: {$user->name} (ID: {$user->id})");
        
        if ($user->cv) {
            $cvPath = storage_path('app/public/' . $user->cv);
            $exists = file_exists($cvPath);
            $this->info("CV actuel: {$user->cv}");
            $this->info("Fichier existe: " . ($exists ? 'Oui' : 'Non'));
            
            if ($exists) {
                $size = filesize($cvPath);
                $this->info("Taille du fichier: " . round($size / 1024, 2) . " KB");
            }
        } else {
            $this->warn("Aucun CV uploadé pour cet utilisateur.");
        }

        // Lister les CVs disponibles dans le storage
        $cvFiles = Storage::disk('public')->files('cv');
        if (count($cvFiles) > 0) {
            $this->info("\nFichiers CV disponibles dans storage/app/public/cv:");
            foreach ($cvFiles as $file) {
                $this->line("- {$file}");
            }
        }
    }
}
