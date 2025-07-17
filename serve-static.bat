@echo off
echo Serving static files from dist folder on http://localhost:3000
cd dist
python -m http.server 3000
pause
