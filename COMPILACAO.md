# Instruções de Compilação

## Como Compilar o Projeto

### Opção 1: Compilação Manual (TypeScript)

1. **Instalar TypeScript globalmente (se ainda não tiver):**
   ```bash
   npm install -g typescript
   ```

2. **Compilar os arquivos TypeScript:**
   ```bash
   cd frontend
   tsc
   ```

   Isso vai gerar os arquivos `.js` a partir dos `.ts` na mesma estrutura de pastas.

3. **Abrir o jogo:**
   - Abra `frontend/public/index.html` no navegador
   - Ou use um servidor local

### Opção 2: Usar um Bundler (Recomendado para Produção)

Para desenvolvimento mais avançado, você pode usar:
- **Webpack**
- **Vite**
- **Parcel**
- **Rollup**

### Estrutura após Compilação

```
frontend/
  public/
    index.html
  src/
    main.js (gerado)
    main.ts (fonte)
    components/
      Menu.js (gerado)
      Menu.ts (fonte)
    ...
```

## Servidor Local Simples

Se precisar de um servidor HTTP simples para testar:

```bash
# Python 3
python -m http.server 8000

# Node.js (com http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000/frontend/public/`

## Nota Importante

Os arquivos TypeScript precisam ser compilados para JavaScript antes de usar no navegador. O navegador não executa TypeScript diretamente.

