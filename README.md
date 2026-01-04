# Quiz Bíblia - Arquitetura Profissional

Projeto de quiz bíblico com arquitetura front-end e back-end separados, desenvolvido em TypeScript.

## 🏗️ Estrutura do Projeto

```
/frontend
  /public
    index.html
  /src
    /styles
      main.css
      components.css
    /components
      Menu.ts
      PlayerMenu.ts
      GameScreen.ts
      Ranking.ts
    /data
      questions.ts
      questionsAdapter.ts
    /services
      StorageService.ts
      DifficultyManager.ts
      RankingService.ts
    /utils
      shuffle.ts
    main.ts
    types.ts

/backend
  /src
    server.ts
  package.json
  README.md
```

## 🚀 Como Usar

### Frontend

1. **Compilar TypeScript:**
   ```bash
   cd frontend
   tsc
   ```

2. **Abrir no navegador:**
   - Abra `frontend/public/index.html` diretamente no navegador
   - Ou use um servidor local (ex: Live Server, http-server)

### Backend

O backend é apenas estrutural por enquanto. Para usar no futuro:

```bash
cd backend
npm install
npm run dev
```

## 📋 Funcionalidades

### ✅ Implementadas

- **Menu Inicial:** Tela de boas-vindas com botões para iniciar jogo e gerenciar jogadores
- **Cadastro de Jogadores:** Sistema para adicionar de 1 a 4 jogadores com validações
- **Randomização:** Perguntas embaralhadas aleatoriamente a cada partida
- **Sistema de Turnos:** Alternância automática entre jogadores
- **Timer por Pergunta:** Contador regressivo de 15 segundos
- **Pontuação Individual:** Cada jogador tem sua própria pontuação
- **Ranking em Tempo Real:** Atualização automática durante o jogo
- **Sistema de Níveis:** 3 níveis (Fácil, Médio, Difícil)
- **Persistência Local:** Salva estado do jogo no LocalStorage

### 🎯 Fluxo do Jogo

1. **Menu Inicial** → Selecionar ação
2. **Gerenciar Jogadores** → Adicionar/remover jogadores (opcional)
3. **Iniciar Jogo** → Carrega nível 1 (Fácil) com perguntas randomizadas
4. **Jogar** → Perguntas alternadas entre jogadores
5. **Avançar Níveis** → Nível 2 (Médio) e Nível 3 (Difícil)
6. **Resultado Final** → Ranking final com vencedor destacado

## 🎨 Design

- Paleta de cores verde elegante
- Animações suaves e transições
- Interface responsiva
- Feedback visual claro

## 🛠️ Tecnologias

- **TypeScript**
- **HTML5 / CSS3**
- **DOM API** (sem frameworks)
- **LocalStorage API**

## 📝 Notas de Desenvolvimento

- Código modular e organizado
- Componentes separados por responsabilidade
- TypeScript para type safety
- Preparado para expansão futura (ranking online, backend real)

## 🔄 Próximos Passos (Futuro)

- Implementar backend real com banco de dados
- Ranking online global
- Sistema de dificuldade adaptativa mais sofisticado
- Autenticação de usuários
- Histórico de partidas

