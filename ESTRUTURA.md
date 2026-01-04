# Estrutura do Projeto Quiz Bíblia

## 📁 Estrutura de Diretórios

```
/quiz-bíblia/
  ├── assets/                    # Assets do projeto (imagens, etc.)
  │   └── .gitkeep
  │
  ├── backend/                   # Backend estrutural
  │   ├── src/
  │   │   └── .gitkeep          # Código-fonte do backend
  │   ├── package.json
  │   └── README.md
  │
  ├── frontend/                  # Frontend completo
  │   ├── public/
  │   │   ├── index.html        # HTML principal
  │   │   └── sounds/
  │   │       └── .gitkeep      # Arquivos de áudio
  │   │
  │   └── src/
  │       ├── components/       # Componentes React/TS
  │       │   └── .gitkeep
  │       │
  │       ├── data/             # Dados e configurações
  │       │   └── .gitkeep
  │       │
  │       ├── services/         # Serviços (Storage, API, etc.)
  │       │   └── .gitkeep
  │       │
  │       ├── styles/           # Arquivos CSS
  │       │   └── .gitkeep
  │       │
  │       └── utils/            # Utilitários
  │           └── .gitkeep
  │
  ├── .gitignore                # Configuração Git
  ├── README.md                 # Documentação principal
  └── COMPILACAO.md             # Instruções de compilação
```

## 📝 Notas

- Os arquivos `.gitkeep` garantem que as pastas vazias sejam versionadas
- O código-fonte TypeScript (`.ts`) está oculto no repositório
- Apenas a estrutura e arquivos de documentação são visíveis
- Para compilar o projeto, consulte `COMPILACAO.md`

## 🚀 Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **HTML5/CSS3** - Frontend
- **LocalStorage API** - Persistência local

## 📚 Documentação

- `README.md` - Visão geral do projeto
- `COMPILACAO.md` - Como compilar o projeto
