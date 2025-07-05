#!/bin/bash

echo "🏗️  Début du build statique..."

# Nettoyage
echo "🧹 Nettoyage du dossier dist..."
rm -rf dist

# Build avec Vite
echo "⚡ Build avec Vite..."
npx vite build --mode static

# Vérification
if [ -d "dist" ]; then
    echo "✅ Build réussi ! Contenu du dossier dist :"
    ls -la dist/
    
    echo "📁 Copie des assets..."
    # Copie des images
    cp -r public/images dist/ 2>/dev/null || echo "⚠️  Pas d'images à copier"
    
    # Copie du CV
    cp public/cv.pdf dist/ 2>/dev/null || echo "⚠️  Pas de CV à copier"
    
    # Copie des favicons
    cp public/favicon.* dist/ 2>/dev/null || echo "⚠️  Pas de favicons à copier"
    cp public/apple-touch-icon.png dist/ 2>/dev/null || echo "⚠️  Pas d'apple-touch-icon à copier"
    
    # Copie du fichier .nojekyll
    cp .nojekyll dist/
    
    echo "✅ Assets copiés ! Contenu final :"
    ls -la dist/
    
    echo "🎉 Build terminé avec succès ! Votre portfolio est prêt pour GitHub Pages."
    echo "📂 Les fichiers sont dans le dossier 'dist/'"
else
    echo "❌ Build échoué ! Vérifiez les erreurs ci-dessus."
    exit 1
fi
