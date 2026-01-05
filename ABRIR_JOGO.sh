#!/bin/bash
# Script para abrir o jogo Quiz Bíblia
# Desenvolvido por Geêndersom Araújo e Gerlano Araújo

echo "🎮 Abrindo Quiz Bíblia..."
echo ""

# Ir para a pasta do projeto
cd "$(dirname "$0")"

# Verificar se os arquivos JS foram compilados
if [ ! -f "frontend/src/main.js" ]; then
    echo "⚠️  Arquivos JavaScript não encontrados!"
    echo "📦 Compilando TypeScript..."
    echo ""
    cd frontend
    if command -v tsc &> /dev/null; then
        tsc
    elif [ -f "node_modules/.bin/tsc" ]; then
        ./node_modules/.bin/tsc
    else
        echo "❌ TypeScript não encontrado. Instalando..."
        npm install typescript --save-dev
        ./node_modules/.bin/tsc
    fi
    cd ..
    echo ""
fi

# Verificar se Python está disponível
if command -v python3 &> /dev/null; then
    echo "🚀 Iniciando servidor local..."
    echo "📂 Abra no navegador: http://localhost:8000/public/index.html"
    echo "⏹️  Pressione Ctrl+C para parar o servidor"
    echo ""
    cd frontend
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Iniciando servidor local..."
    echo "📂 Abra no navegador: http://localhost:8000/public/index.html"
    echo "⏹️  Pressione Ctrl+C para parar o servidor"
    echo ""
    cd frontend
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python não encontrado!"
    echo ""
    echo "💡 Alternativas:"
    echo "   1. Instale Python 3"
    echo "   2. Ou use Node.js: npx http-server frontend -p 8000"
    echo "   3. Depois acesse: http://localhost:8000/public/index.html"
    exit 1
fi

