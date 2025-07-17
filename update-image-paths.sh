#!/bin/bash

echo "Mise à jour des chemins d'images dans le HTML..."

# Aller dans le répertoire du projet
cd "$(dirname "$0")"

# Vérifier si le fichier index.html existe
if [ ! -f "static-portfolio/index.html" ]; then
    echo "Erreur: static-portfolio/index.html non trouvé!"
    exit 1
fi

# Sauvegarder le fichier original
cp "static-portfolio/index.html" "static-portfolio/index.html.backup"

# Remplacer les chemins des images
sed -i 's|../public/01JZ6B6MW84YMJP3D1PS5CGC8M.png|assets/images/photo.jpg|g' "static-portfolio/index.html"
sed -i 's|../public/NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png|assets/images/NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png|g' "static-portfolio/index.html"
sed -i 's|../public/VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png|assets/images/VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png|g' "static-portfolio/index.html"
sed -i 's|../public/hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png|assets/images/hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png|g' "static-portfolio/index.html"
sed -i 's|../public/01JZ6D9VRAN5YP2HRY3GPJ110H.png|assets/images/01JZ6D9VRAN5YP2HRY3GPJ110H.png|g' "static-portfolio/index.html"
sed -i 's|../public/cv.pdf|assets/cv/cv.pdf|g' "static-portfolio/index.html"

echo "Chemins mis à jour avec succès!"
echo "Fichier original sauvegardé sous index.html.backup"
