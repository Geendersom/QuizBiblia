#!/bin/bash
# Script para abrir o jogo diretamente
# Desenvolvido por Geêndersom Araújo e Gerlano Araújo

cd "$(dirname "$0")/.."

# Verificar se está compilado
if [ ! -f "src/main.js" ]; then
    echo "Compilando TypeScript..."
    if [ -f "node_modules/.bin/tsc" ]; then
        ./node_modules/.bin/tsc
    else
        npm install typescript --save-dev
        ./node_modules/.bin/tsc
    fi
fi

# Abrir servidor
cd public
python3 -m http.server 8000

