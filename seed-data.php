<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\Models\Project;
use App\Models\Skill;

echo "=== AJOUT DE DONNÉES DE TEST ===\n";

// Mettre à jour l'utilisateur avec photo et CV
$user = User::first();
if ($user) {
    $user->update([
        'photo' => 'profile/photo.jpg',
        'cv' => 'cv.pdf'
    ]);
    echo "✅ Utilisateur mis à jour avec photo et CV\n";
}

// Ajouter des projets
$projects = [
    [
        'user_id' => 1,
        'title' => 'Next-Librairie',
        'description' => 'Application de gestion de bibliothèque moderne avec Next.js',
        'github_link' => 'https://github.com/yacineatmani/Next-Libraire',
        'demo_link' => 'https://github.com/yacineatmani/Next-Libraire',
        'image' => 'projects/NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png',
        'technologies' => 'Next.js,React,TypeScript,Tailwind CSS'
    ],
    [
        'user_id' => 1,
        'title' => 'Adam vs Yacine',
        'description' => 'Projet collaboratif de développement web avec CSS avancé',
        'github_link' => 'https://github.com/yacineatmani/gestion-librairie',
        'demo_link' => 'https://github.com/yacineatmani/gestion-librairie',
        'image' => 'projects/VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png',
        'technologies' => 'HTML,CSS,JavaScript,PHP'
    ],
    [
        'user_id' => 1,
        'title' => 'E-commerce Next.js',
        'description' => 'Plateforme e-commerce complète avec panier et paiement',
        'github_link' => 'https://github.com/yacineatmani/gestion-librairie',
        'demo_link' => 'https://github.com/yacineatmani/gestion-librairie',
        'image' => 'projects/hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png',
        'technologies' => 'Next.js,Stripe,MongoDB,React'
    ],
    [
        'user_id' => 1,
        'title' => 'All Nations in World',
        'description' => 'Application géographique interactive des pays du monde',
        'github_link' => 'https://github.com/yacineatmani/Project_Flag',
        'demo_link' => 'https://yacineatmani.github.io/Project_Flag',
        'image' => 'projects/01JZ6D9VRAN5YP2HRY3GPJ110H.png',
        'technologies' => 'JavaScript,API REST,CSS3,HTML5'
    ]
];

foreach ($projects as $projectData) {
    Project::create($projectData);
    echo "✅ Projet '{$projectData['title']}' ajouté\n";
}

// Ajouter des compétences
$skills = [
    ['user_id' => 1, 'name' => 'React', 'level' => 'Expert'],
    ['user_id' => 1, 'name' => 'Laravel', 'level' => 'Avancé'],
    ['user_id' => 1, 'name' => 'JavaScript', 'level' => 'Expert'],
    ['user_id' => 1, 'name' => 'PHP', 'level' => 'Avancé'],
    ['user_id' => 1, 'name' => 'Node.js', 'level' => 'Intermédiaire'],
    ['user_id' => 1, 'name' => 'TypeScript', 'level' => 'Avancé'],
    ['user_id' => 1, 'name' => 'Tailwind CSS', 'level' => 'Expert'],
    ['user_id' => 1, 'name' => 'Docker', 'level' => 'Intermédiaire'],
    ['user_id' => 1, 'name' => 'MySQL', 'level' => 'Avancé']
];

foreach ($skills as $skillData) {
    Skill::create($skillData);
    echo "✅ Compétence '{$skillData['name']}' ajoutée\n";
}

echo "\n=== DONNÉES FINALES ===\n";
echo "User: " . json_encode(User::first()->toArray()) . "\n";
echo "Projects: " . Project::count() . " projets ajoutés\n";
echo "Skills: " . Skill::count() . " compétences ajoutées\n";
