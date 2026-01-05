// Desenvolvido por Geêndersom Araújo e Gerlano Araújo

// ============================================
// QUIZ BÍBLIA - ARQUITETURA PROFISSIONAL
// ============================================

// ============================================
// IMPORTS
// ============================================
declare global {
    interface Window {
        StorageService?: any;
        RankingService?: any;
        DifficultyManager?: any;
    }
}

import { QuizState, Player, ScreenType, AppState } from './types.js';
import { getLevelQuestions } from './data/questionsAdapter.js';
import { Menu } from './components/Menu.js';
import { PlayerMenu } from './components/PlayerMenu.js';
import { AudioControl } from './components/AudioControl.js';
import { AudioService } from './services/AudioService.js';
import { StorageService } from './services/StorageService.js';
import { RankingService } from './services/RankingService.js';
import { DifficultyManager } from './services/DifficultyManager.js';

// ============================================
// ESTADO GLOBAL DA APLICAÇÃO
// ============================================

const appState: AppState = {
    currentScreen: 'menu',
    players: [],
    gameStarted: false,
    isPresentationMode: false
};

const quizState: QuizState = {
    perguntas: [],
    perguntaAtual: 0,
    pontuacao: 0,
    respostaSelecionada: null,
    jogoFinalizado: false,
    tempoRestante: 15,
    tempoLimite: 15,
    timerId: null,
    timerAtivo: false,
    respostasNoTempo: 0,
    respostasForaDoTempo: 0,
    estrelasDoNivel: 0,
    players: [],
    jogadorAtualIndex: 0,
    ranking: [],
    cadastroCompleto: false,
    nivelAtual: 1,
    perguntasJaUsadas: [],
    playerStatsCache: {}
};

// ============================================
// VARIÁVEIS GLOBAIS DE ELEMENTOS DOM
// ============================================

let appRoot: HTMLElement;
let menuContainer: HTMLElement;
let playerMenuContainer: HTMLElement;
let gameContainer: HTMLElement;
let rankingContainer: HTMLElement;
let finalScreen: HTMLElement;
let audioControlContainer: HTMLElement;
let questionTextEl: HTMLElement;
let questionNumberEl: HTMLElement;
let scoreEl: HTMLElement;
let currentPlayerDisplay: HTMLElement;
let alternativesEls: NodeListOf<HTMLButtonElement>;
let nextBtn: HTMLButtonElement;
let rankingList: HTMLElement;
let timerDisplay: HTMLElement;
let timerValue: HTMLElement;
let timerMessage: HTMLElement;

/**
 * Cria a estrutura HTML dinamicamente
 */
function createHTMLStructure(): void {
    appRoot = document.getElementById('app-root') as HTMLElement;
    if (!appRoot) {
        console.error('ERRO: app-root não encontrado! Criando fallback...');
        appRoot = document.createElement('div');
        appRoot.id = 'app-root';
        appRoot.className = 'container';
        document.body.appendChild(appRoot);
    }

    // Criar containers dinamicamente
    menuContainer = document.createElement('div');
    menuContainer.id = 'menu-container';

    playerMenuContainer = document.createElement('div');
    playerMenuContainer.id = 'player-menu-container';

    // Criar estrutura do jogo
    gameContainer = document.createElement('div');
    gameContainer.className = 'quiz-box';
    gameContainer.style.display = 'none';
    gameContainer.innerHTML = `
        <div class="header">
            <h1>Quiz</h1>
            <div class="score-display">
                <span>Pontuação: <span id="score">0</span></span>
            </div>
        </div>
        
        <div id="current-player-display" class="current-player-display" style="display: none;">
            Vez de: Jogador 1
        </div>
        
        <div class="timer-container">
            <div class="timer-display" id="timer-display">
                <span>Tempo: <span id="timer-value">15</span>s</span>
            </div>
            <div class="timer-message" id="timer-message" style="display: none;">
                Tempo esgotado
            </div>
        </div>
        
        <div class="question-container">
            <div class="question-number">
                <span id="question-number">Pergunta 1</span>
            </div>
            <div class="question-text" id="question-text">
                Carregando pergunta...
            </div>
        </div>
        
        <div class="alternatives-container">
            <div class="alternative-row">
                <button class="alternative" data-index="0" id="alt-0">
                    <span class="alt-letter">A</span>
                    <span class="alt-text"></span>
                </button>
                <button class="alternative" data-index="1" id="alt-1">
                    <span class="alt-letter">B</span>
                    <span class="alt-text"></span>
                </button>
            </div>
            <div class="alternative-row">
                <button class="alternative" data-index="2" id="alt-2">
                    <span class="alt-letter">C</span>
                    <span class="alt-text"></span>
                </button>
                <button class="alternative" data-index="3" id="alt-3">
                    <span class="alt-letter">D</span>
                    <span class="alt-text"></span>
                </button>
            </div>
        </div>
        
        <div class="actions">
            <button id="next-btn" class="btn-next" style="display: none;">
                Próxima Pergunta
            </button>
        </div>
    `;

    // Criar ranking lateral
    rankingContainer = document.createElement('div');
    rankingContainer.id = 'ranking-container';
    rankingContainer.className = 'ranking-container';
    rankingContainer.style.display = 'none';
    rankingContainer.innerHTML = `
        <h3>Ranking</h3>
        <div id="ranking-list" class="ranking-list"></div>
    `;

    // Adicionar ao app-root
    appRoot.appendChild(menuContainer);
    appRoot.appendChild(gameContainer);
    appRoot.appendChild(rankingContainer);

    finalScreen = document.getElementById('final-screen') as HTMLElement;

    // Container para controle de áudio
    audioControlContainer = document.createElement('div');
    audioControlContainer.id = 'audio-control-container';
    audioControlContainer.className = 'audio-control-container';
    document.body.appendChild(audioControlContainer);

    // Referências aos elementos criados
    questionTextEl = document.getElementById('question-text') as HTMLElement;
    questionNumberEl = document.getElementById('question-number') as HTMLElement;
    scoreEl = document.getElementById('score') as HTMLElement;
    currentPlayerDisplay = document.getElementById('current-player-display') as HTMLElement;
    alternativesEls = document.querySelectorAll('.alternative') as NodeListOf<HTMLButtonElement>;
    nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
    rankingList = document.getElementById('ranking-list') as HTMLElement;
    timerDisplay = document.getElementById('timer-display') as HTMLElement;
    timerValue = document.getElementById('timer-value') as HTMLElement;
    timerMessage = document.getElementById('timer-message') as HTMLElement;
}

// ============================================
// COMPONENTES
// ============================================

let menu: Menu;
let playerMenu: PlayerMenu;
let audioControl: AudioControl;

function initializeComponents(): void {
    menu = new Menu(
        menuContainer,
        () => handleStartGame(),
        () => handleManagePlayers(),
        (enabled: boolean) => handleTogglePresentationMode(enabled)
    );

    playerMenu = new PlayerMenu(
        playerMenuContainer,
        () => handleClosePlayerMenu(),
        (players) => handlePlayersChanged(players)
    );

    audioControl = new AudioControl(audioControlContainer);

    // Adicionar player menu ao body (modal overlay)
    document.body.appendChild(playerMenuContainer);
}

// ============================================
// GERENCIAMENTO DE TELAS
// ============================================

function showScreen(screen: ScreenType): void {
    appState.currentScreen = screen;
    
    // Ocultar todas as telas
    menuContainer.style.display = 'none';
    playerMenuContainer.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'none';
    if (finalScreen) finalScreen.style.display = 'none';
    if (rankingContainer) rankingContainer.style.display = 'none';
    
    // Mostrar tela atual
    switch (screen) {
        case 'menu':
            menuContainer.style.display = 'flex';
            menu.render(appState.players.length, appState.isPresentationMode);
            break;
        case 'playerMenu':
            playerMenuContainer.style.display = 'flex';
            playerMenu.setPlayers(appState.players);
            playerMenu.show();
            break;
        case 'game':
            if (gameContainer) gameContainer.style.display = 'flex';
            if (rankingContainer) rankingContainer.style.display = 'block';
            break;
        case 'final':
            if (finalScreen) finalScreen.style.display = 'flex';
            break;
    }
}

// ============================================
// HANDLERS DO MENU
// ============================================

function handleStartGame(): void {
    if (appState.players.length === 0) {
        // Se não houver jogadores, abrir menu de jogadores
        handleManagePlayers();
        return;
    }
    
    // Tocar som de início de jogo
    AudioService.playGameStart();
    
    // Iniciar o jogo
    quizState.players = appState.players.map(p => ({ ...p }));
    quizState.nivelAtual = 1;
    quizState.perguntasJaUsadas = [];
    quizState.playerStatsCache = {};
    
    // Carregar perguntas do nível 1 (randomizadas)
    loadLevel(1);
    
    // Mostrar tela do jogo
    showScreen('game');
    
    // Inicializar jogo
    inicializarQuiz();
}

function handleManagePlayers(): void {
    showScreen('playerMenu');
}

function handleClosePlayerMenu(): void {
    showScreen('menu');
}

function handlePlayersChanged(players: Player[]): void {
    appState.players = players;
    // Atualizar menu para refletir mudanças
    if (appState.currentScreen === 'menu') {
        menu.render(players.length, appState.isPresentationMode);
    }
}

/**
 * Alterna o modo apresentação
 */
function handleTogglePresentationMode(enabled: boolean): void {
    appState.isPresentationMode = enabled;
    
    // Aplicar classe no body
    if (enabled) {
        document.body.classList.add('presentation-mode');
    } else {
        document.body.classList.remove('presentation-mode');
    }
    
    // Salvar no LocalStorage
    try {
        localStorage.setItem('quizbiblia_presentation_mode', enabled.toString());
    } catch (error) {
        console.warn('Erro ao salvar modo apresentação:', error);
    }
    
    // Atualizar menu
    if (appState.currentScreen === 'menu') {
        menu.render(appState.players.length, enabled);
    }
}

// ============================================
// CARREGAMENTO DE NÍVEIS
// ============================================

function loadLevel(nivel: number): void {
    // Carregar e randomizar perguntas do nível
    quizState.perguntas = getLevelQuestions(nivel);
    quizState.nivelAtual = nivel;
    quizState.perguntaAtual = 0;
    quizState.perguntasJaUsadas = [];
}

// ============================================
// TIMER
// ============================================

function pararTimer(): void {
    if (quizState.timerId !== null) {
        clearInterval(quizState.timerId);
        quizState.timerId = null;
    }
    quizState.timerAtivo = false;
}

function iniciarTimer(): void {
    pararTimer();
    
    // Resetar flag de timer warning para nova pergunta
    AudioService.resetTimerWarning();
    
    quizState.tempoRestante = quizState.tempoLimite;
    quizState.timerAtivo = true;
    
    if (timerMessage) timerMessage.style.display = 'none';
    if (timerDisplay) timerDisplay.style.display = 'flex';
    
    atualizarDisplayTimer();
    
    quizState.timerId = window.setInterval(() => {
        quizState.tempoRestante--;
        atualizarDisplayTimer();
        
        // Tocar aviso de timer quando restar 5 segundos ou menos
        if (quizState.tempoRestante <= 5 && quizState.tempoRestante > 0) {
            AudioService.playTimerWarning(quizState.perguntaAtual);
        }
        
        if (quizState.tempoRestante <= 0) {
            tempoEsgotado();
        }
    }, 1000);
}

function atualizarDisplayTimer(): void {
    if (timerValue) {
        timerValue.textContent = quizState.tempoRestante.toString();
    }
    
    if (timerDisplay) {
        if (quizState.tempoRestante <= 5) {
            timerDisplay.classList.add('timer-urgente');
        } else {
            timerDisplay.classList.remove('timer-urgente');
        }
    }
}

function tempoEsgotado(): void {
    pararTimer();
    
    quizState.respostasForaDoTempo++;
    
    const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
    if (jogadorAtual) {
        jogadorAtual.respostasForaDoTempo++;
        jogadorAtual.erros++;
    }
    
    quizState.respostaSelecionada = -1;
    
    alternativesEls.forEach((btn) => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    const respostaCorreta = pergunta.indiceCorreto;
    alternativesEls[respostaCorreta].classList.add('correct');
    
    if (timerMessage) {
        timerMessage.style.display = 'block';
        timerDisplay.style.display = 'none';
    }
    
    atualizarRanking();
    
    if (quizState.perguntaAtual < quizState.perguntas.length - 1) {
        if (nextBtn) nextBtn.style.display = 'block';
    } else {
        setTimeout(() => {
            finalizarNivel();
        }, 2000);
    }
}

// ============================================
// FUNÇÕES DO JOGO
// ============================================

function inicializarQuiz(): void {
    quizState.perguntaAtual = 0;
    quizState.respostaSelecionada = null;
    quizState.jogoFinalizado = false;
    
    // Resetar estatísticas dos jogadores
    quizState.players.forEach(player => {
        player.pontuacao = 0;
        player.acertos = 0;
        player.erros = 0;
        player.estrelas = 0;
        player.respostasNoTempo = 0;
        player.respostasForaDoTempo = 0;
    });
    
    quizState.respostasNoTempo = 0;
    quizState.respostasForaDoTempo = 0;
    
    atualizarRanking();
    mostrarPergunta();
}

function mostrarPergunta(): void {
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    const questionContainer = document.querySelector('.question-container') as HTMLElement;
    const alternativesContainer = document.querySelector('.alternatives-container') as HTMLElement;
    
    // Transição de saída (se não for primeira pergunta)
    if (quizState.perguntaAtual > 0 && questionContainer && alternativesContainer) {
        // Remover classes anteriores
        questionContainer.classList.remove('question-active', 'question-enter');
        alternativesContainer.classList.remove('question-active', 'question-enter');
        
        // Adicionar classe de saída
        questionContainer.classList.add('question-exit');
        alternativesContainer.classList.add('question-exit');
        
        // Após transição de saída, atualizar conteúdo e fazer entrada
        setTimeout(() => {
            atualizarConteudoPergunta(pergunta);
            
            // Remover classe de saída e adicionar de entrada
            questionContainer.classList.remove('question-exit');
            alternativesContainer.classList.remove('question-exit');
            questionContainer.classList.add('question-enter');
            alternativesContainer.classList.add('question-enter');
            
            // Após entrada, remover classe e manter estado ativo
            setTimeout(() => {
                questionContainer.classList.remove('question-enter');
                alternativesContainer.classList.remove('question-enter');
                questionContainer.classList.add('question-active');
                alternativesContainer.classList.add('question-active');
                
                // Iniciar timer após transição completa
                setTimeout(() => {
                    iniciarTimer();
                }, 100);
            }, 600);
        }, 400);
    } else {
        // Primeira pergunta - apenas entrada
        atualizarConteudoPergunta(pergunta);
        
        if (questionContainer && alternativesContainer) {
            // Remover classes anteriores
            questionContainer.classList.remove('question-active', 'question-exit');
            alternativesContainer.classList.remove('question-active', 'question-exit');
            
            questionContainer.classList.add('question-enter');
            alternativesContainer.classList.add('question-enter');
            
            setTimeout(() => {
                questionContainer.classList.remove('question-enter');
                alternativesContainer.classList.remove('question-enter');
                questionContainer.classList.add('question-active');
                alternativesContainer.classList.add('question-active');
                
                setTimeout(() => {
                    iniciarTimer();
                }, 100);
            }, 600);
        }
    }
}

/**
 * Atualiza o conteúdo da pergunta (sem transição)
 */
function atualizarConteudoPergunta(pergunta: any): void {
    // Atualizar jogador atual
    if (quizState.players.length > 0) {
        quizState.jogadorAtualIndex = quizState.perguntaAtual % quizState.players.length;
        const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
        if (currentPlayerDisplay) {
            currentPlayerDisplay.textContent = `Vez de: ${jogadorAtual.nome}`;
            currentPlayerDisplay.style.display = 'block';
        }
    } else {
        if (currentPlayerDisplay) currentPlayerDisplay.style.display = 'none';
    }
    
    // Atualizar número da pergunta
    if (questionNumberEl) {
        questionNumberEl.textContent = `Pergunta ${quizState.perguntaAtual + 1} de ${quizState.perguntas.length}`;
    }
    
    // Atualizar texto da pergunta
    if (questionTextEl) {
        questionTextEl.textContent = pergunta.pergunta;
    }
    
    // Atualizar alternativas
    alternativesEls.forEach((btn, index) => {
        const altText = btn.querySelector('.alt-text') as HTMLElement;
        if (altText) {
            altText.textContent = `: ${pergunta.alternativas[index]}`;
        }
        
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect', 'option--selected', 'option--correct', 'option--wrong', 'option--disabled');
        btn.style.pointerEvents = 'auto';
    });
    
    if (nextBtn) nextBtn.style.display = 'none';
    quizState.respostaSelecionada = null;
}

function selecionarAlternativa(index: number): void {
    if (quizState.respostaSelecionada !== null || !quizState.timerAtivo) {
        return;
    }
    
    quizState.respostaSelecionada = index;
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    const respostaCorreta = pergunta.indiceCorreto;
    
    pararTimer();
    
    quizState.respostasNoTempo++;
    
    // Marcar alternativa selecionada (feixe de luz)
    alternativesEls[index].classList.add('option--selected');
    
    // Desabilitar outras alternativas (fazer opacas)
    alternativesEls.forEach((btn, i) => {
        if (i !== index) {
            btn.classList.add('option--disabled');
        }
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
    if (jogadorAtual) {
        jogadorAtual.respostasNoTempo++;
        
        const acertou = index === respostaCorreta;
        
        if (!acertou) {
            // Tocar som de erro
            AudioService.playWrong();
            // Animação de erro
            alternativesEls[index].classList.remove('option--selected');
            alternativesEls[index].classList.add('option--wrong');
            
            // Após animação de erro, mostrar resposta correta
            setTimeout(() => {
                alternativesEls[index].classList.remove('option--wrong');
                alternativesEls[index].classList.add('incorrect');
                
                // Destacar resposta correta com animação
                alternativesEls[respostaCorreta].classList.remove('option--disabled');
                alternativesEls[respostaCorreta].classList.add('option--correct');
                
                // Após animação, manter estado estável
                setTimeout(() => {
                    alternativesEls[respostaCorreta].classList.remove('option--correct');
                    alternativesEls[respostaCorreta].classList.add('correct');
                }, 1200);
            }, 600);
            
            jogadorAtual.erros++;
        } else {
            // Tocar som de acerto
            AudioService.playCorrect();
            // Animação de acerto
            alternativesEls[index].classList.remove('option--selected');
            alternativesEls[index].classList.add('option--correct');
            
            // Após animação, manter estado estável
            setTimeout(() => {
                alternativesEls[index].classList.remove('option--correct');
                alternativesEls[index].classList.add('correct');
            }, 1200);
            
            jogadorAtual.pontuacao += 10;
            jogadorAtual.acertos++;
            quizState.pontuacao++;
            atualizarScore();
        }
    } else {
        // Sem jogador - lógica similar mas simplificada
        const acertou = index === respostaCorreta;
        if (acertou) {
            alternativesEls[index].classList.remove('option--selected');
            alternativesEls[index].classList.add('option--correct');
            setTimeout(() => {
                alternativesEls[index].classList.remove('option--correct');
                alternativesEls[index].classList.add('correct');
            }, 1200);
        } else {
            alternativesEls[index].classList.remove('option--selected');
            alternativesEls[index].classList.add('option--wrong');
            setTimeout(() => {
                alternativesEls[index].classList.remove('option--wrong');
                alternativesEls[index].classList.add('incorrect');
                alternativesEls[respostaCorreta].classList.remove('option--disabled');
                alternativesEls[respostaCorreta].classList.add('option--correct');
                setTimeout(() => {
                    alternativesEls[respostaCorreta].classList.remove('option--correct');
                    alternativesEls[respostaCorreta].classList.add('correct');
                }, 1200);
            }, 600);
        }
    }
    
    atualizarRanking();
    
    if (quizState.perguntaAtual < quizState.perguntas.length - 1) {
        if (nextBtn) nextBtn.style.display = 'block';
    } else {
        setTimeout(() => {
            finalizarNivel();
        }, 1500);
    }
}

function proximaPergunta(): void {
    // Pequena pausa antes da transição
    setTimeout(() => {
        quizState.perguntaAtual++;
        
        if (quizState.perguntaAtual < quizState.perguntas.length) {
            mostrarPergunta();
        } else {
            finalizarNivel();
        }
    }, 400);
}

function finalizarNivel(): void {
    // Tocar som de nível completo
    AudioService.playLevelComplete();
    
    // Verificar se há mais níveis
    const niveis = [1, 2, 3]; // FÁCIL, MÉDIO, DIFÍCIL
    const proximoNivel = niveis.find(n => n > quizState.nivelAtual);
    
    if (proximoNivel) {
        // Avançar para próximo nível
        loadLevel(proximoNivel);
        quizState.perguntaAtual = 0;
        mostrarPergunta();
    } else {
        // Jogo finalizado
        finalizarJogo();
    }
}

async function finalizarJogo(): Promise<void> {
    quizState.jogoFinalizado = true;
    pararTimer();
    
    // Tocar som de fim de jogo
    AudioService.playGameOver();
    
    atualizarRanking();
    atualizarRankingFinal();
    
    showScreen('final');
    
    const finalScoreEl = document.getElementById('final-score') as HTMLElement;
    const totalQuestionsEl = document.getElementById('total-questions') as HTMLElement;
    
    if (finalScoreEl && totalQuestionsEl) {
        if (quizState.players.length > 0) {
            const totalPontos = quizState.players.reduce((sum, p) => sum + p.pontuacao, 0);
            finalScoreEl.textContent = totalPontos.toString();
        } else {
            finalScoreEl.textContent = quizState.pontuacao.toString();
        }
        totalQuestionsEl.textContent = quizState.perguntas.length.toString();
    }
}

function atualizarScore(): void {
    if (scoreEl) {
        if (quizState.players.length > 0) {
            const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
            scoreEl.textContent = jogadorAtual?.pontuacao.toString() || '0';
        } else {
            scoreEl.textContent = quizState.pontuacao.toString();
        }
    }
}

function atualizarRanking(): void {
    quizState.ranking = [...quizState.players].sort((a, b) => {
        if (b.pontuacao !== a.pontuacao) {
            return b.pontuacao - a.pontuacao;
        }
        return b.acertos - a.acertos;
    });
    
    if (rankingList) {
        rankingList.innerHTML = '';
        
        quizState.ranking.forEach((player, index) => {
            const rankItem = document.createElement('div');
            rankItem.className = 'rank-item';
            
            const position = index + 1;
            const positionClass = position === 1 ? 'rank-1' : position === 2 ? 'rank-2' : position === 3 ? 'rank-3' : '';
            
            rankItem.innerHTML = `
                <span class="rank-position ${positionClass}">${position}º</span>
                <span class="rank-name">${player.nome}</span>
                <span class="rank-score">${player.pontuacao} pts</span>
            `;
            
            rankingList.appendChild(rankItem);
        });
    }
}

function atualizarRankingFinal(): void {
    const finalRankingList = document.getElementById('final-ranking-list') as HTMLElement;
    if (!finalRankingList) return;
    
    finalRankingList.innerHTML = '';
    
    quizState.ranking.forEach((player, index) => {
        const rankItem = document.createElement('div');
        rankItem.className = 'final-rank-item';
        
        const position = index + 1;
        if (position === 1) {
            rankItem.classList.add('winner');
        }
        
        rankItem.innerHTML = `
            <span class="final-rank-position">${position}º</span>
            <span class="final-rank-name">${player.nome}</span>
            <span class="final-rank-score">${player.pontuacao} pts</span>
            <span class="final-rank-stats">(${player.acertos} acertos)</span>
        `;
        
        finalRankingList.appendChild(rankItem);
    });
}

// ============================================
// EVENT LISTENERS - Anexar após DOM estar pronto
// ============================================

function attachEventListeners(): void {
    // Event listeners para alternativas
    const alts = document.querySelectorAll('.alternative') as NodeListOf<HTMLButtonElement>;
    alts.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            AudioService.playClick();
            selecionarAlternativa(index);
        });
    });

    // Event listener para botão "Próxima Pergunta"
    const nextBtnEl = document.getElementById('next-btn') as HTMLButtonElement;
    if (nextBtnEl) {
        nextBtnEl.addEventListener('click', () => {
            AudioService.playClick();
            proximaPergunta();
        });
    }

    // Event listener para botão "Novo Jogo"
    const finalRestartBtn = document.getElementById('final-restart-btn') as HTMLButtonElement;
    if (finalRestartBtn) {
        finalRestartBtn.addEventListener('click', () => {
            AudioService.playClick();
            showScreen('menu');
        });
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando Quiz Bíblia...');
    
    try {
        // 1. Criar estrutura HTML primeiro
        console.log('📐 Criando estrutura HTML...');
        createHTMLStructure();
        
        // 2. Inicializar componentes
        console.log('🧩 Inicializando componentes...');
        initializeComponents();
        
        // 3. Inicializar serviços
        console.log('📦 Inicializando serviços...');
        AudioService.init();
        StorageService.init();
        RankingService.init();
        DifficultyManager.init();
        
        // Expor serviços globalmente (para compatibilidade)
        (window as any).StorageService = StorageService;
        (window as any).RankingService = RankingService;
        (window as any).DifficultyManager = DifficultyManager;
        
        console.log('✅ Serviços inicializados');
        
        // 4. Renderizar controle de áudio
        audioControl.render();
        
        // 5. Anexar event listeners (após criar HTML dinâmico)
        attachEventListeners();
        
        // 6. Carregar modo apresentação do LocalStorage
        try {
            const savedMode = localStorage.getItem('quizbiblia_presentation_mode');
            if (savedMode === 'true') {
                appState.isPresentationMode = true;
                document.body.classList.add('presentation-mode');
            }
        } catch (error) {
            console.warn('Erro ao carregar modo apresentação:', error);
        }
        
        console.log('🎮 Mostrando menu inicial...');
        // 7. Mostrar menu inicial
        showScreen('menu');
        
        // 8. Carregar jogadores salvos se houver
        try {
            const saved = StorageService.loadGameState();
            if (saved && saved.players && saved.players.length > 0) {
                appState.players = saved.players;
                menu.render(saved.players.length, appState.isPresentationMode);
            }
        } catch (error) {
            console.warn('Erro ao carregar jogadores salvos:', error);
        }
        
        console.log('✅ Inicialização completa!');
    } catch (error) {
        console.error('❌ ERRO na inicialização:', error);
        // Mostrar mensagem de erro no DOM
        const errorRoot = document.getElementById('app-root') || document.body;
        errorRoot.innerHTML = `
            <div style="color: #ff6b6b; padding: 40px; text-align: center;">
                <h2>Erro ao carregar o jogo</h2>
                <p>${error instanceof Error ? error.message : String(error)}</p>
                <p style="margin-top: 20px; font-size: 0.9em; color: #999;">Verifique o console do navegador para mais detalhes.</p>
            </div>
        `;
    }
});

