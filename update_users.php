<?php

use App\Models\User;

// Mettre à jour votre utilisateur avec le bon chemin de photo
$user = User::where('email', 'yacineatmani1080@gmail.com')->first();
if ($user) {
    $user->update(['photo' => 'profile/photo.jpg']);
    echo "Photo mise à jour pour : " . $user->name . "\n";
} else {
    echo "Utilisateur non trouvé\n";
}

// Créer l'utilisateur admin s'il n'existe pas
$admin = User::where('email', 'admin@admin.com')->first();
if (!$admin) {
    User::create([
        'name' => 'Admin',
        'email' => 'admin@admin.com', 
        'password' => bcrypt('password'),
        'email_verified_at' => now()
    ]);
    echo "Utilisateur admin créé\n";
} else {
    echo "Utilisateur admin existe déjà\n";
}

// Lister tous les utilisateurs
$users = User::all();
foreach ($users as $user) {
    echo "ID: {$user->id}, Nom: {$user->name}, Email: {$user->email}, Photo: {$user->photo}\n";
}
