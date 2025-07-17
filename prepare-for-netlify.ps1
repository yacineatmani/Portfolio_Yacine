# Script de préparation pour le déploiement Netlify
# Ce script copie les vraies images dans le dossier static-portfolio et corrige les chemins

Write-Host "🚀 Préparation du portfolio pour le déploiement Netlify..." -ForegroundColor Green

# Étape 1: Copier manuellement les vraies images
Write-Host "📋 Instructions pour copier les images :" -ForegroundColor Yellow
Write-Host "1. Copiez manuellement ces fichiers :" -ForegroundColor Cyan
Write-Host "   - public\01JZ6B6MW84YMJP3D1PS5CGC8M.png -> static-portfolio\assets\images\photo.jpg" -ForegroundColor White
Write-Host "   - PortfolioLaravel.png -> static-portfolio\assets\images\portfolio-laravel.png" -ForegroundColor White
Write-Host "   - public\NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png -> static-portfolio\assets\images\" -ForegroundColor White
Write-Host "   - public\VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png -> static-portfolio\assets\images\" -ForegroundColor White
Write-Host "   - public\hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png -> static-portfolio\assets\images\" -ForegroundColor White
Write-Host "   - public\01JZ6D9VRAN5YP2HRY3GPJ110H.png -> static-portfolio\assets\images\" -ForegroundColor White
Write-Host "   - public\cv.pdf -> static-portfolio\assets\cv\cv.pdf" -ForegroundColor White

Write-Host ""
Write-Host "2. Après avoir copié les fichiers, exécutez le script fix-paths.ps1" -ForegroundColor Cyan

Write-Host ""
Write-Host "🌐 Une fois terminé, votre portfolio sera prêt pour Netlify !" -ForegroundColor Green
