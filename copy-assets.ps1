# Script PowerShell pour copier les assets vers le portfolio statique
Write-Host "=== Copie des Assets vers Portfolio Statique ===" -ForegroundColor Green

# Définir les chemins de base
$basePath = Split-Path -Parent $MyInvocation.MyCommand.Path
$staticPath = Join-Path $basePath "static-portfolio"
$assetsImages = Join-Path $staticPath "assets\images"
$assetsCV = Join-Path $staticPath "assets\cv"

# Créer les dossiers s'ils n'existent pas
if (!(Test-Path $assetsImages)) {
    New-Item -ItemType Directory -Path $assetsImages -Force
    Write-Host "Dossier créé: $assetsImages" -ForegroundColor Yellow
}

if (!(Test-Path $assetsCV)) {
    New-Item -ItemType Directory -Path $assetsCV -Force
    Write-Host "Dossier créé: $assetsCV" -ForegroundColor Yellow
}

# Fontion pour copier avec vérification
function Copy-IfExists {
    param($Source, $Destination, $Description)
    
    if (Test-Path $Source) {
        try {
            Copy-Item $Source $Destination -Force
            Write-Host "✅ $Description copié: $(Split-Path $Destination -Leaf)" -ForegroundColor Green
            return $true
        } catch {
            Write-Host "❌ Erreur lors de la copie de $Description : $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "⚠️  $Description non trouvé: $Source" -ForegroundColor Yellow
        return $false
    }
}

Write-Host "`n1. Copie de la photo de profil..." -ForegroundColor Cyan

# Essayer différents emplacements pour la photo de profil
$photoSources = @(
    "storage\YacineProfile.JPG",
    "storage\app\public\profile\photo.jpg",
    "public\01JZ6B6MW84YMJP3D1PS5CGC8M.png",
    "public\test-photo.jpg"
)

$photoDestination = Join-Path $assetsImages "photo.jpg"
$photoCopied = $false

foreach ($source in $photoSources) {
    $fullSource = Join-Path $basePath $source
    if (Copy-IfExists $fullSource $photoDestination "Photo de profil") {
        $photoCopied = $true
        break
    }
}

if (!$photoCopied) {
    Write-Host "❌ Aucune photo de profil trouvée!" -ForegroundColor Red
}

Write-Host "`n2. Copie du CV..." -ForegroundColor Cyan

# Essayer différents emplacements pour le CV
$cvSources = @(
    "storage\cv.pdf",
    "storage\cvs.pdf", 
    "public\cv.pdf",
    "storage\app\public\cv\01JZ6EXQJTTW9ZNE9G5VC9ZFK5.pdf"
)

$cvDestination = Join-Path $assetsCV "cv.pdf"
$cvCopied = $false

foreach ($source in $cvSources) {
    $fullSource = Join-Path $basePath $source
    if (Copy-IfExists $fullSource $cvDestination "CV") {
        $cvCopied = $true
        break
    }
}

if (!$cvCopied) {
    Write-Host "❌ Aucun CV trouvé!" -ForegroundColor Red
}

Write-Host "`n3. Copie des images de projets..." -ForegroundColor Cyan

# Images de projets depuis le dossier public
$projectImages = @(
    "NF6Pvbb4wIWUgacXbdU9TBPP82CJ5dhPYhcOHaq6.png",
    "VlYo2Gh2p54gVMNXpYDddEIcbTPMD7YyFQbrvvJo.png", 
    "hjdDFZY7AYyIdLvfVNcYb7P65FmP9joEiLNsyzPy.png",
    "01JZ6D9VRAN5YP2HRY3GPJ110H.png",
    "01JZ6B6MW84YMJP3D1PS5CGC8M.png",
    "01JZ6BQDFM3K6NDQTA81E9A8ED.png"
)

$projectsCopied = 0

foreach ($image in $projectImages) {
    $sourceImage = Join-Path $basePath "public\$image"
    $destImage = Join-Path $assetsImages $image
    
    if (Copy-IfExists $sourceImage $destImage "Image projet") {
        $projectsCopied++
    }
}

Write-Host "`n=== RÉSUMÉ ===" -ForegroundColor Magenta
Write-Host "Photo de profil: $(if($photoCopied){'✅'}else{'❌'})" -ForegroundColor $(if($photoCopied){'Green'}else{'Red'})
Write-Host "CV: $(if($cvCopied){'✅'}else{'❌'})" -ForegroundColor $(if($cvCopied){'Green'}else{'Red'})
Write-Host "Images de projets: $projectsCopied copiées" -ForegroundColor $(if($projectsCopied -gt 0){'Green'}else{'Red'})

Write-Host "`n📁 Vérifiez le contenu de: $assetsImages" -ForegroundColor Blue
Get-ChildItem $assetsImages | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor Gray }

Write-Host "`n🚀 Portfolio prêt pour déploiement!" -ForegroundColor Green
Write-Host "Ouvrez static-portfolio/index.html dans un navigateur pour tester." -ForegroundColor Blue

# Proposer d'ouvrir le portfolio
$choice = Read-Host "`nVoulez-vous ouvrir le portfolio maintenant? (o/n)"
if ($choice -eq 'o' -or $choice -eq 'O') {
    $indexPath = Join-Path $staticPath "index.html"
    Start-Process $indexPath
}
