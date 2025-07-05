<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;

// Supprimer les anciens admins
User::where('email', 'admin@example.com')->delete();
User::where('email', 'admin@admin.com')->delete();
User::where('email', 'admin@test.com')->delete();

// Créer ou mettre à jour l'utilisateur principal
$user = User::updateOrCreate(
    ['email' => 'yacineatmani1080@gmail.com'],
    [
        'name' => 'Yacine Atmani',
        'first_name' => 'Yacine',
        'password' => bcrypt('admin123'),
        'bio' => 'Développeur Fullstack passionné par Laravel, React et les technologies modernes. Expert en création d\'applications web performantes et évolutives.',
        'email_verified_at' => now(),
    ]
);

echo "✅ Utilisateur créé/mis à jour :\n";
echo "📧 Email: yacineatmani1080@gmail.com\n";
echo "🔐 Mot de passe: admin123\n";
echo "🆔 ID: " . $user->id . "\n";
