#!/bin/bash
# Script de compilação do projeto Quiz Bíblia
# Desenvolvido por Geêndersom Araújo e Gerlano Araújo

echo "🔨 Compilando projeto Quiz Bíblia..."
echo ""

# Verificar se TypeScript está instalado
if ! command -v tsc &> /dev/null; then
    echo "❌ TypeScript não encontrado!"
    echo ""
    echo "📦 Instalando TypeScript via npm..."
    npm install -g typescript
    echo ""
fi

# Compilar
echo "⚙️  Compilando arquivos TypeScript..."
cd "$(dirname "$0")"
tsc

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Compilação concluída com sucesso!"
    echo ""
    echo "🚀 Agora você pode abrir:"
    echo "   frontend/public/index.html"
    echo ""
    echo "📝 Ou use um servidor local:"
    echo "   cd frontend/public && python3 -m http.server 8000"
else
    echo ""
    echo "❌ Erro na compilação. Verifique os erros acima."
    exit 1
fi

