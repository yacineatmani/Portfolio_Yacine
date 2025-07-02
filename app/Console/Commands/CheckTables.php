<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

class CheckTables extends Command
{
    protected $signature = 'db:check-tables';
    protected $description = 'Vérifier la structure des tables';

    public function handle()
    {
        $this->info("=== Structure de la table USERS ===");
        $userColumns = Schema::getColumnListing('users');
        foreach ($userColumns as $column) {
            $this->line("- $column");
        }

        $this->info("\n=== Structure de la table PROJECTS ===");
        $projectColumns = Schema::getColumnListing('projects');
        foreach ($projectColumns as $column) {
            $this->line("- $column");
        }

        return 0;
    }
}
