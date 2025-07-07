<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\Models\Project;
use App\Models\Skill;

echo "=== DONNÉES DE LA BASE ===\n";

$user = User::first();
echo "User: " . ($user ? json_encode($user->toArray()) : 'NULL') . "\n\n";

$projects = Project::all();
echo "Projects (" . $projects->count() . "): " . json_encode($projects->toArray()) . "\n\n";

$skills = Skill::all();
echo "Skills (" . $skills->count() . "): " . json_encode($skills->toArray()) . "\n\n";
