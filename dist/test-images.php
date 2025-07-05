<!DOCTYPE html>
<html>
<head>
    <title>Test Images</title>
</head>
<body>
    <h1>Test des Images</h1>
    
    <h2>Photo de profil :</h2>
    <img src="/storage/profile/photo.jpg" style="width: 100px; height: 100px;" alt="Photo de profil">
    <p>URL: /storage/profile/photo.jpg</p>
    
    <h2>Photo de profil (racine) :</h2>
    <img src="/storage/photo.jpg" style="width: 100px; height: 100px;" alt="Photo de profil racine">
    <p>URL: /storage/photo.jpg</p>
    
    <h2>Images de projets :</h2>
    <?php
    $projectImages = glob('storage/app/public/projects/*');
    foreach ($projectImages as $image) {
        $filename = basename($image);
        echo '<div>';
        echo '<img src="/storage/projects/' . $filename . '" style="width: 100px; height: 100px; margin: 5px;" alt="Projet">';
        echo '<p>URL: /storage/projects/' . $filename . '</p>';
        echo '</div>';
    }
    ?>
    
    <h2>Vérification des fichiers :</h2>
    <ul>
        <li>Photo profile existe : <?= file_exists('storage/profile/photo.jpg') ? 'OUI' : 'NON' ?></li>
        <li>Photo racine existe : <?= file_exists('storage/photo.jpg') ? 'OUI' : 'NON' ?></li>
        <li>Lien symbolique existe : <?= is_link('storage') ? 'OUI' : 'NON' ?></li>
    </ul>
</body>
</html>
