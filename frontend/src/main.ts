// ============================================
// QUIZ BÍBLIA - ARQUITETURA PROFISSIONAL
// ============================================

// ============================================
// IMPORTS - Serviços globais (carregados via script tags)
// ============================================
declare global {
    interface Window {
        StorageService?: any;
        RankingService?: any;
        DifficultyManager?: any;
    }
}

import { QuizState, Player, ScreenType, AppState } from './types';
import { getLevelQuestions } from './data/questionsAdapter';
import { Menu } from './components/Menu';
import { PlayerMenu } from './components/PlayerMenu';
import { AudioControl } from './components/AudioControl';
import { AudioService } from './services/AudioService';

// ============================================
// ESTADO GLOBAL DA APLICAÇÃO
// ============================================

const appState: AppState = {
    currentScreen: 'menu',
    players: [],
    gameStarted: false
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
// ELEMENTOS DOM
// ============================================

const container = document.querySelector('.container') as HTMLElement;
const menuContainer = document.createElement('div');
menuContainer.id = 'menu-container';

const playerMenuContainer = document.createElement('div');
playerMenuContainer.id = 'player-menu-container';

const gameContainer = document.querySelector('.quiz-box') as HTMLElement;
const finalScreen = document.getElementById('final-screen') as HTMLElement;

// Container para controle de áudio
const audioControlContainer = document.createElement('div');
audioControlContainer.id = 'audio-control-container';
audioControlContainer.className = 'audio-control-container';

// Elementos do jogo
const questionTextEl = document.getElementById('question-text') as HTMLElement;
const questionNumberEl = document.getElementById('question-number') as HTMLElement;
const scoreEl = document.getElementById('score') as HTMLElement;
const currentPlayerDisplay = document.getElementById('current-player-display') as HTMLElement;
const alternativesEls = document.querySelectorAll('.alternative') as NodeListOf<HTMLButtonElement>;
const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
const rankingContainer = document.getElementById('ranking-container') as HTMLElement;
const rankingList = document.getElementById('ranking-list') as HTMLElement;
const timerDisplay = document.getElementById('timer-display') as HTMLElement;
const timerValue = document.getElementById('timer-value') as HTMLElement;
const timerMessage = document.getElementById('timer-message') as HTMLElement;

// ============================================
// COMPONENTES
// ============================================

const menu = new Menu(
    menuContainer,
    () => handleStartGame(),
    () => handleManagePlayers()
);

const playerMenu = new PlayerMenu(
    playerMenuContainer,
    () => handleClosePlayerMenu(),
    (players) => handlePlayersChanged(players)
);

const audioControl = new AudioControl(audioControlContainer);

// Adicionar containers ao DOM
if (container && gameContainer) {
    container.insertBefore(menuContainer, gameContainer);
    document.body.appendChild(playerMenuContainer);
}
// Adicionar controle de áudio ao body (topo direito)
document.body.appendChild(audioControlContainer);

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
            menu.render(appState.players.length);
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
        menu.render(players.length);
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
        questionTextEl.style.animation = 'none';
        setTimeout(() => {
            questionTextEl.style.animation = 'fadeIn 0.3s ease-out';
        }, 10);
    }
    
    // Atualizar alternativas
    alternativesEls.forEach((btn, index) => {
        const altText = btn.querySelector('.alt-text') as HTMLElement;
        if (altText) {
            altText.textContent = `: ${pergunta.alternativas[index]}`;
        }
        
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
        btn.style.pointerEvents = 'auto';
    });
    
    if (nextBtn) nextBtn.style.display = 'none';
    quizState.respostaSelecionada = null;
    
    // Aguardar um pouco antes de iniciar o timer (game feel)
    setTimeout(() => {
        iniciarTimer();
    }, 300);
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
    
    const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
    if (jogadorAtual) {
        jogadorAtual.respostasNoTempo++;
        
        const acertou = index === respostaCorreta;
        
        if (!acertou) {
            // Tocar som de erro
            AudioService.playWrong();
            alternativesEls[index].classList.add('incorrect');
            jogadorAtual.erros++;
        } else {
            // Tocar som de acerto
            AudioService.playCorrect();
            jogadorAtual.pontuacao += 10;
            jogadorAtual.acertos++;
            quizState.pontuacao++;
            atualizarScore();
        }
    }
    
    alternativesEls.forEach((btn) => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    alternativesEls[respostaCorreta].classList.add('correct');
    
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
    quizState.perguntaAtual++;
    
    if (quizState.perguntaAtual < quizState.perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarNivel();
    }
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
// EVENT LISTENERS
// ============================================

alternativesEls.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // Tocar som de clique
        AudioService.playClick();
        selecionarAlternativa(index);
    });
});

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        // Tocar som de clique
        AudioService.playClick();
        proximaPergunta();
    });
}

const finalRestartBtn = document.getElementById('final-restart-btn') as HTMLButtonElement;
if (finalRestartBtn) {
    finalRestartBtn.addEventListener('click', () => {
        // Tocar som de clique
        AudioService.playClick();
        showScreen('menu');
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AudioService
    AudioService.init();
    
    // Renderizar controle de áudio
    audioControl.render();
    
    // Mostrar menu inicial
    showScreen('menu');
    
    // Carregar jogadores salvos se houver
    try {
        if (typeof (window as any).StorageService !== 'undefined') {
            const saved = (window as any).StorageService.loadGameState();
            if (saved && saved.players) {
                appState.players = saved.players;
                menu.render(saved.players.length);
            }
        }
    } catch (error) {
        console.warn('Erro ao carregar jogadores salvos:', error);
    }
});

