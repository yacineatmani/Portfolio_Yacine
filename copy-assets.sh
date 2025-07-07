#!/bin/bash

echo "🚀 Copie des assets Laravel vers le dossier public..."

# Créer les dossiers de destination s'ils n'existent pas
mkdir -p public/storage
mkdir -p public/images/profile
mkdir -p public/images/projects

# Copier les assets du storage Laravel
echo "📁 Copie des fichiers de storage/app/public/ vers public/storage/"
if [ -d "storage/app/public" ]; then
    cp -r storage/app/public/* public/storage/ 2>/dev/null || echo "⚠️  Aucun fichier dans storage/app/public/"
else
    echo "⚠️  Dossier storage/app/public/ non trouvé"
fi

# Copier les images directement si elles existent
echo "🖼️  Copie des images de profil..."
if [ -f "storage/photo.jpg" ]; then
    cp storage/photo.jpg public/images/profile/
    echo "✅ photo.jpg copié"
fi

if [ -f "storage/YacineProfile.JPG" ]; then
    cp storage/YacineProfile.JPG public/images/profile/
    echo "✅ YacineProfile.JPG copié"
fi

# Copier le CV
echo "📄 Copie du CV..."
if [ -f "storage/cv.pdf" ]; then
    cp storage/cv.pdf public/
    echo "✅ CV copié"
fi

# Copier tous les fichiers de storage vers public/storage
if [ -d "storage" ]; then
    echo "📂 Copie complète du dossier storage..."
    cp -r storage/* public/storage/ 2>/dev/null
fi

echo "✅ Copie des assets terminée!"
echo "📂 Contenu de public/storage:"
ls -la public/storage/ 2>/dev/null || echo "Dossier vide"
