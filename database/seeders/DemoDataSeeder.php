<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;
use App\Models\Skill;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer le premier utilisateur
        $user = User::first();
        
        if (!$user) {
            $this->command->error('Aucun utilisateur trouvé. Créez d\'abord un utilisateur.');
            return;
        }

        // Créer des projets de démonstration
        $projects = [
            [
                'title' => 'Portfolio Laravel React',
                'description' => 'Un portfolio moderne construit avec Laravel et React, incluant un panneau d\'administration Filament.',
                'technologies' => 'Laravel,React,Filament,Tailwind CSS,MySQL',
                'github_link' => 'https://github.com/yacineatmani/portfolio',
                'demo_link' => 'https://portfolio.demo.com',
                'image' => null,
                'user_id' => $user->id,
            ],
            [
                'title' => 'Système de Gestion E-commerce',
                'description' => 'Plateforme e-commerce complète avec gestion des stocks, commandes et paiements.',
                'technologies' => 'Laravel,Vue.js,Stripe,Redis,Docker',
                'github_link' => 'https://github.com/yacineatmani/ecommerce',
                'demo_link' => 'https://ecommerce.demo.com',
                'image' => null,
                'user_id' => $user->id,
            ],
            [
                'title' => 'Application de Chat Temps Réel',
                'description' => 'Application de messagerie instantanée avec notifications push et partage de fichiers.',
                'technologies' => 'Node.js,Socket.io,React,MongoDB,WebRTC',
                'github_link' => 'https://github.com/yacineatmani/chat-app',
                'demo_link' => 'https://chat.demo.com',
                'image' => null,
                'user_id' => $user->id,
            ],
        ];

        foreach ($projects as $projectData) {
            Project::updateOrCreate(
                ['title' => $projectData['title'], 'user_id' => $user->id],
                $projectData
            );
        }

        // Créer des compétences de démonstration
        $skills = [
            ['name' => 'Laravel', 'level' => 'Expert', 'user_id' => $user->id],
            ['name' => 'React', 'level' => 'Avancé', 'user_id' => $user->id],
            ['name' => 'Vue.js', 'level' => 'Avancé', 'user_id' => $user->id],
            ['name' => 'Node.js', 'level' => 'Intermédiaire', 'user_id' => $user->id],
            ['name' => 'PHP', 'level' => 'Expert', 'user_id' => $user->id],
            ['name' => 'JavaScript', 'level' => 'Expert', 'user_id' => $user->id],
            ['name' => 'TypeScript', 'level' => 'Avancé', 'user_id' => $user->id],
            ['name' => 'MySQL', 'level' => 'Avancé', 'user_id' => $user->id],
            ['name' => 'Docker', 'level' => 'Intermédiaire', 'user_id' => $user->id],
            ['name' => 'Tailwind CSS', 'level' => 'Avancé', 'user_id' => $user->id],
        ];

        foreach ($skills as $skillData) {
            Skill::updateOrCreate(
                ['name' => $skillData['name'], 'user_id' => $user->id],
                $skillData
            );
        }

        $this->command->info('Données de démonstration créées avec succès !');
        $this->command->info('Projets créés: ' . count($projects));
        $this->command->info('Compétences créées: ' . count($skills));
    }
}
