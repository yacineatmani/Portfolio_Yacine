<?php
// Script pour exporter les données de la base MySQL vers un fichier JSON

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

try {
    $user = User::first();
    
    if (!$user) {
        echo "Aucun utilisateur trouvé\n";
        exit(1);
    }
    
    $projects = $user->projects()->get();
    $skills = $user->skills()->get();
    
    $data = [
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'first_name' => $user->first_name,
            'bio' => $user->bio,
            'photo' => $user->photo,
            'cv' => $user->cv,
        ],
        'projects' => $projects->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'github_link' => $project->github_link,
                'demo_link' => $project->demo_link,
                'image' => $project->image,
                'stack' => $project->technologies ? explode(',', $project->technologies) : [],
                'challenges' => $project->description,
                'video' => null
            ];
        })->toArray(),
        'skills' => $skills->map(function ($skill) {
            return [
                'id' => $skill->id,
                'name' => $skill->name,
                'level' => $skill->level,
            ];
        })->toArray(),
        'experiences' => []
    ];
    
    // Sauvegarder dans un fichier JSON
    file_put_contents('src/data.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo "Données exportées avec succès vers src/data.json\n";
    echo "Utilisateur: " . $user->name . "\n";
    echo "Projets: " . count($data['projects']) . "\n";
    echo "Compétences: " . count($data['skills']) . "\n";
    
} catch (Exception $e) {
    echo "Erreur: " . $e->getMessage() . "\n";
    exit(1);
}
