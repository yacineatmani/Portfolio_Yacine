#!/bin/bash
echo "Serving static files from dist folder on http://localhost:3000"
cd dist
python3 -m http.server 3000
