<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;

$user = User::first();
$data = [
    'user' => $user ? [
        'id' => $user->id,
        'name' => $user->name,
        'first_name' => $user->first_name,
        'bio' => $user->bio,
        'photo' => $user->photo,
        'cv' => $user->cv
    ] : null,
    'projects' => $user ? $user->projects->map(function($project) {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'github_link' => $project->github_link,
            'demo_link' => $project->demo_link,
            'image' => $project->image,
            'stack' => $project->technologies ? explode(',', $project->technologies) : [],
            'challenges' => $project->description
        ];
    })->toArray() : [],
    'skills' => $user ? $user->skills->toArray() : [],
    'experiences' => [
        [
            'id' => 1,
            'role' => 'Développeur Full Stack',
            'company' => 'MolenGeek',
            'period' => '2024 - Présent',
            'description' => 'Formation intensive en développement web moderne avec focus sur React et Laravel',
            'tech' => ['React', 'Laravel', 'JavaScript', 'PHP']
        ],
        [
            'id' => 2,
            'role' => 'Développeur Frontend',
            'company' => 'Projets Personnels',
            'period' => '2023 - 2024',
            'description' => 'Développement d\'applications web modernes et responsive',
            'tech' => ['HTML', 'CSS', 'JavaScript', 'React']
        ]
    ]
];

echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
