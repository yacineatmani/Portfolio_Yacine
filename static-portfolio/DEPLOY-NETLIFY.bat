@echo off
cls
echo.
echo ========================================
echo   DEPLOIEMENT PORTFOLIO SUR NETLIFY
echo ========================================
echo.
echo Etape 1: Ouverture de Netlify...
start "Netlify" "https://app.netlify.com/drop"
timeout /t 2 /nobreak >nul

echo.
echo Etape 2: Ouverture du dossier...
start "Portfolio" "%~dp0"
timeout /t 1 /nobreak >nul

echo.
echo ========================================
echo INSTRUCTIONS DE DEPLOIEMENT :
echo ========================================
echo.
echo 1. Dans la fenetre Netlify qui s'ouvre :
echo    - Connectez-vous si necessaire
echo    - Vous verrez une zone "Drag and drop"
echo.
echo 2. Dans l'explorateur qui s'ouvre :
echo    - Selectionnez TOUS les fichiers
echo    - Glissez-les sur la zone Netlify
echo.
echo 3. Attendez la fin du deploiement
echo.
echo ========================================
echo FORMULAIRE DE CONTACT :
echo ========================================
echo Email: yacineatmani1080@gmail.com
echo Service: Formspree (configure automatiquement)
echo.
echo ========================================
echo.
pause
