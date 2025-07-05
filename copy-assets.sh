#!/bin/bash
# Script pour copier les images du storage vers public pour GitHub Pages

echo "Copie des images du storage vers public..."

# Créer les dossiers si ils n'existent pas
mkdir -p public/storage/projects
mkdir -p public/storage/profile  
mkdir -p public/storage/cv

# Copier les images de projets
if [ -d "storage/app/public/projects" ]; then
    cp -r storage/app/public/projects/* public/storage/projects/ 2>/dev/null || true
    echo "Images de projets copiées"
fi

# Copier les photos de profil
if [ -d "storage/app/public/profile" ]; then
    cp -r storage/app/public/profile/* public/storage/profile/ 2>/dev/null || true
    echo "Photos de profil copiées"
fi

# Copier les CV
if [ -d "storage/app/public/cv" ]; then
    cp -r storage/app/public/cv/* public/storage/cv/ 2>/dev/null || true
    echo "CV copiés"
fi

echo "Copie terminée !"
