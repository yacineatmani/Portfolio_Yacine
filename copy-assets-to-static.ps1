# Script PowerShell pour copier les assets du portfolio
Write-Host "🚀 Copie des assets pour le portfolio statique..." -ForegroundColor Green

# Créer les dossiers si ils n'existent pas
$imagesDir = "static-portfolio\assets\images"
$cvDir = "static-portfolio\assets\cv"

if (-not (Test-Path $imagesDir)) {
    New-Item -Path $imagesDir -ItemType Directory -Force
}

if (-not (Test-Path $cvDir)) {
    New-Item -Path $cvDir -ItemType Directory -Force
}

# Copier la photo de profil
Write-Host "📸 Copie de la photo de profil..." -ForegroundColor Yellow
Copy-Item "public\01JZ6B6MW84YMJP3D1PS5CGC8M.png" "$imagesDir\photo.jpg" -Force

# Copier l'image du portfolio Laravel
Write-Host "🖼️ Copie de l'image Portfolio Laravel..." -ForegroundColor Yellow
Copy-Item "PortfolioLaravel.png" "$imagesDir\portfolio-laravel.png" -Force

# Copier les images des projets
Write-Host "🎨 Copie des images des projets..." -ForegroundColor Yellow
Copy-Item "public\NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png" "$imagesDir\" -Force
Copy-Item "public\VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png" "$imagesDir\" -Force
Copy-Item "public\hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png" "$imagesDir\" -Force
Copy-Item "public\01JZ6D9VRAN5YP2HRY3GPJ110H.png" "$imagesDir\" -Force

# Copier le CV
Write-Host "📄 Copie du CV..." -ForegroundColor Yellow
Copy-Item "public\cv.pdf" "$cvDir\cv.pdf" -Force

Write-Host "✅ Copie terminée ! Tous les assets sont maintenant dans le dossier static-portfolio." -ForegroundColor Green
Write-Host "🌐 Vous pouvez maintenant ouvrir static-portfolio\index.html dans votre navigateur." -ForegroundColor Cyan
