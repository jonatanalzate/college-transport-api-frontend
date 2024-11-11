#!/bin/bash

# Crear estructura de carpetas
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/hooks
mkdir -p src/styles
mkdir -p src/assets
mkdir -p src/config

# Crear archivos base
touch src/services/api.js
touch src/services/vehiculosService.js
touch src/services/rutasService.js
touch src/services/conductoresService.js
touch src/components/UploadCsv.js
touch src/components/MapView.js
touch src/components/Navbar.js
touch src/pages/Home.js
touch src/styles/global.css 