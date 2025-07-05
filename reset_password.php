<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->boot();

use App\Models\User;

// Réinitialiser le mot de passe du premier utilisateur
$user = User::find(1);
if ($user) {
    $user->password = bcrypt('admin123');
    $user->save();
    echo "Mot de passe mis à jour pour {$user->email}\n";
    echo "Email: {$user->email}\n";
    echo "Mot de passe: admin123\n";
} else {
    echo "Aucun utilisateur trouvé\n";
}
