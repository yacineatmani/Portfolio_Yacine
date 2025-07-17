# Script pour corriger les chemins des images après copie manuelle
# À exécuter après avoir copié manuellement les images

Write-Host "🔧 Correction des chemins d'images pour le déploiement..." -ForegroundColor Green

$htmlFile = "static-portfolio\index.html"

if (Test-Path $htmlFile) {
    $content = Get-Content $htmlFile -Raw
    
    # Remplacer les chemins relatifs par les chemins locaux
    $content = $content -replace '\.\./public/01JZ6B6MW84YMJP3D1PS5CGC8M\.png', 'assets/images/photo.jpg'
    $content = $content -replace '\.\./PortfolioLaravel\.png', 'assets/images/portfolio-laravel.png'
    $content = $content -replace '\.\./public/NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6\.png', 'assets/images/NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png'
    $content = $content -replace '\.\./public/VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo\.png', 'assets/images/VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png'
    $content = $content -replace '\.\./public/hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy\.png', 'assets/images/hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png'
    $content = $content -replace '\.\./public/01JZ6D9VRAN5YP2HRY3GPJ110H\.png', 'assets/images/01JZ6D9VRAN5YP2HRY3GPJ110H.png'
    
    # Sauvegarder le fichier modifié
    Set-Content $htmlFile $content -Encoding UTF8
    
    Write-Host "✅ Chemins d'images corrigés avec succès !" -ForegroundColor Green
    Write-Host "🚀 Votre portfolio est maintenant prêt pour le déploiement sur Netlify !" -ForegroundColor Cyan
} else {
    Write-Host "❌ Fichier index.html non trouvé dans static-portfolio/" -ForegroundColor Red
}
