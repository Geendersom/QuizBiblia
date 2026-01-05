@echo off
REM Script de compilação do projeto Quiz Bíblia (Windows)
REM Desenvolvido por Geêndersom Araújo e Gerlano Araújo

echo 🔨 Compilando projeto Quiz Bíblia...
echo.

REM Verificar se TypeScript está instalado
where tsc >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ TypeScript não encontrado!
    echo.
    echo 📦 Instalando TypeScript via npm...
    call npm install -g typescript
    echo.
)

REM Compilar
echo ⚙️  Compilando arquivos TypeScript...
cd /d %~dp0
call tsc

if %errorlevel% equ 0 (
    echo.
    echo ✅ Compilação concluída com sucesso!
    echo.
    echo 🚀 Agora você pode abrir:
    echo    frontend\public\index.html
    echo.
) else (
    echo.
    echo ❌ Erro na compilação. Verifique os erros acima.
    pause
    exit /b 1
)

pause

