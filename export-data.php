<?php

require_once 'vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

// Configuration de la base de données
$capsule = new Capsule;
$capsule->addConnection([
    'driver' => 'mysql',
    'host' => 'localhost',
    'database' => 'portfolio',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

try {
    // Récupération des données utilisateur
    $user = $capsule->table('users')->first();
    
    // Récupération des projets
    $projects = $capsule->table('projects')->get()->toArray();
    
    // Récupération des compétences
    $skills = $capsule->table('skills')->get()->toArray();
    
    // Récupération des expériences (si la table existe)
    $experiences = [];
    try {
        $experiences = $capsule->table('experiences')->get()->toArray();
    } catch (Exception $e) {
        // Table n'existe pas, on ignore
    }

    // Nettoyage des chemins d'images (enlever les backslashes)
    if ($user && $user->photo) {
        $user->photo = str_replace('\\', '/', $user->photo);
    }
    if ($user && $user->cv) {
        $user->cv = str_replace('\\', '/', $user->cv);
    }

    foreach ($projects as $project) {
        if ($project->image) {
            $project->image = str_replace('\\', '/', $project->image);
        }
    }

    // Préparation des données
    $data = [
        'user' => $user,
        'projects' => $projects,
        'skills' => $skills,
        'experiences' => $experiences
    ];

    // Export en JSON avec options pour éviter les backslashes
    $jsonData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
    // Sauvegarde dans le fichier
    file_put_contents('src/data.json', $jsonData);
    
    echo "✅ Données exportées avec succès dans src/data.json\n";
    echo "📊 User: " . ($user ? $user->name : 'Non trouvé') . "\n";
    echo "📁 Projets: " . count($projects) . "\n";
    echo "🛠️ Compétences: " . count($skills) . "\n";
    echo "💼 Expériences: " . count($experiences) . "\n";
    
} catch (Exception $e) {
    echo "❌ Erreur lors de l'export: " . $e->getMessage() . "\n";
    exit(1);
}
