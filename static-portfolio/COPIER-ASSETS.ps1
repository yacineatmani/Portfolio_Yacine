# 🔧 SCRIPT DE COPIE MANUELLE DES ASSETS

Write-Host "🚀 Copie des assets pour votre portfolio..." -ForegroundColor Green

# Instructions détaillées pour copier manuellement
Write-Host ""
Write-Host "📋 COPIEZ CES FICHIERS MANUELLEMENT :" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. 📸 PHOTO DE PROFIL :" -ForegroundColor Cyan
Write-Host "   Source : public\01JZ6B6MW84YMJP3D1PS5CGC8M.png" -ForegroundColor White
Write-Host "   Destination : static-portfolio\assets\images\photo.jpg" -ForegroundColor Green
Write-Host "   ⚠️  IMPORTANT : Renommez l'extension de .png à .jpg" -ForegroundColor Red
Write-Host ""

Write-Host "2. 📄 CV :" -ForegroundColor Cyan
Write-Host "   Source : public\cv.pdf" -ForegroundColor White
Write-Host "   Destination : static-portfolio\assets\cv\cv.pdf" -ForegroundColor Green
Write-Host ""

Write-Host "3. 🖼️  IMAGES DES PROJETS (optionnel) :" -ForegroundColor Cyan
Write-Host "   Source : public\NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png" -ForegroundColor White
Write-Host "   Destination : static-portfolio\assets\images\" -ForegroundColor Green
Write-Host ""
Write-Host "   Source : public\VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png" -ForegroundColor White
Write-Host "   Destination : static-portfolio\assets\images\" -ForegroundColor Green
Write-Host ""
Write-Host "   Source : public\hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png" -ForegroundColor White
Write-Host "   Destination : static-portfolio\assets\images\" -ForegroundColor Green
Write-Host ""
Write-Host "   Source : public\01JZ6D9VRAN5YP2HRY3GPJ110H.png" -ForegroundColor White
Write-Host "   Destination : static-portfolio\assets\images\" -ForegroundColor Green
Write-Host ""
Write-Host "   Source : PortfolioLaravel.png" -ForegroundColor White
Write-Host "   Destination : static-portfolio\assets\images\portfolio-laravel.png" -ForegroundColor Green
Write-Host ""

Write-Host "✅ UNE FOIS LA COPIE TERMINÉE :" -ForegroundColor Green
Write-Host "   1. Testez votre portfolio en ouvrant index.html" -ForegroundColor White
Write-Host "   2. Redéployez sur Netlify" -ForegroundColor White
Write-Host "   3. Votre portfolio sera parfait !" -ForegroundColor White
Write-Host ""

# Ouvrir les dossiers pour faciliter la copie
Write-Host "📁 Ouverture des dossiers..." -ForegroundColor Yellow
Start-Process explorer "c:\Users\MolenGeek\Desktop\Portfolio\PortFolio\public"
Start-Sleep 1
Start-Process explorer "c:\Users\MolenGeek\Desktop\Portfolio\PortFolio\static-portfolio\assets\images"
Start-Sleep 1
Start-Process explorer "c:\Users\MolenGeek\Desktop\Portfolio\PortFolio\static-portfolio\assets\cv"

Write-Host "🎉 Dossiers ouverts ! Vous pouvez maintenant copier les fichiers." -ForegroundColor Green
Write-Host ""
pause
