@echo off
echo Copie des assets depuis Laravel vers le portfolio statique...

:: Copier la photo de profil
echo Copie de la photo de profil...
if exist "storage\YacineProfile.JPG" (
    copy "storage\YacineProfile.JPG" "static-portfolio\assets\images\photo.jpg"
    echo Photo de profil copiée: photo.jpg
) else if exist "storage\app\public\profile\photo.jpg" (
    copy "storage\app\public\profile\photo.jpg" "static-portfolio\assets\images\photo.jpg"
    echo Photo de profil copiée: photo.jpg
) else if exist "public\01JZ6B6MW84YMJP3D1PS5CGC8M.png" (
    copy "public\01JZ6B6MW84YMJP3D1PS5CGC8M.png" "static-portfolio\assets\images\photo.jpg"
    echo Photo de profil copiée: photo.jpg
) else (
    echo ATTENTION: Aucune photo de profil trouvée!
)

:: Copier le CV
echo Copie du CV...
if exist "storage\cv.pdf" (
    copy "storage\cv.pdf" "static-portfolio\assets\cv\cv.pdf"
    echo CV copié: cv.pdf
) else if exist "public\cv.pdf" (
    copy "public\cv.pdf" "static-portfolio\assets\cv\cv.pdf"
    echo CV copié: cv.pdf
) else (
    echo ATTENTION: Aucun CV trouvé!
)

:: Copier les images de projets depuis public
echo Copie des images de projets...
if exist "public\NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png" (
    copy "public\NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png" "static-portfolio\assets\images\"
    echo Image projet 1 copiée: NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png
)

if exist "public\VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png" (
    copy "public\VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png" "static-portfolio\assets\images\"
    echo Image projet 2 copiée: VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png
)

if exist "public\hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png" (
    copy "public\hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png" "static-portfolio\assets\images\"
    echo Image projet 3 copiée: hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png
)

if exist "public\01JZ6D9VRAN5YP2HRY3GPJ110H.png" (
    copy "public\01JZ6D9VRAN5YP2HRY3GPJ110H.png" "static-portfolio\assets\images\"
    echo Image projet 4 copiée: 01JZ6D9VRAN5YP2HRY3GPJ110H.png
)

echo.
echo Copie terminée! Vérifiez le dossier static-portfolio/assets/images/
echo.
pause
