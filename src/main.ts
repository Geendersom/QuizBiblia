// ============================================
// INTERFACES E TIPOS
// ============================================

interface Pergunta {
    id: number;
    pergunta: string;
    alternativas: string[];
    indiceCorreto: number;
}

interface Player {
    id: number;
    nome: string;
    pontuacao: number;
    acertos: number;
    erros: number;
    estrelas: number;
    respostasNoTempo: number;
    respostasForaDoTempo: number;
}

interface QuizState {
    perguntas: Pergunta[];
    perguntaAtual: number;
    pontuacao: number;
    respostaSelecionada: number | null;
    jogoFinalizado: boolean;
    // Timer
    tempoRestante: number;
    tempoLimite: number;
    timerId: number | null;
    timerAtivo: boolean;
    // Rastreamento de desempenho
    respostasNoTempo: number;
    respostasForaDoTempo: number;
    // Sistema de estrelas
    estrelasDoNivel: number;
    // Sistema de múltiplos jogadores
    players: Player[];
    jogadorAtualIndex: number;
    ranking: Player[];
    cadastroCompleto: boolean;
}

// Dados das Perguntas
const perguntas: Pergunta[] = [
    {
        id: 1,
        pergunta: "Que mulher colocou o filho num cesto e lançou-o no rio?",
        alternativas: ["Ana", "Rebeca", "Joquebede", "Raquel"],
        indiceCorreto: 2
    },
    {
        id: 2,
        pergunta: "Qual foi o primeiro livro da Bíblia?",
        alternativas: ["Êxodo", "Gênesis", "Levítico", "Números"],
        indiceCorreto: 1
    },
    {
        id: 3,
        pergunta: "Quantos discípulos Jesus escolheu?",
        alternativas: ["10", "11", "12", "13"],
        indiceCorreto: 2
    },
    {
        id: 4,
        pergunta: "Qual é o maior mandamento segundo Jesus?",
        alternativas: [
            "Não matarás",
            "Amarás o Senhor teu Deus de todo o coração",
            "Não roubarás",
            "Guardarás o sábado"
        ],
        indiceCorreto: 1
    },
    {
        id: 5,
        pergunta: "Quem construiu a arca?",
        alternativas: ["Abraão", "Noé", "Moisés", "Davi"],
        indiceCorreto: 1
    }
];

// ============================================
// ESTADO DO QUIZ
// ============================================

const quizState: QuizState = {
    perguntas: perguntas,
    perguntaAtual: 0,
    pontuacao: 0,
    respostaSelecionada: null,
    jogoFinalizado: false,
    // Timer - 15 segundos por pergunta
    tempoRestante: 15,
    tempoLimite: 15,
    timerId: null,
    timerAtivo: false,
    // Rastreamento de desempenho
    respostasNoTempo: 0,
    respostasForaDoTempo: 0,
    // Sistema de estrelas
    estrelasDoNivel: 0,
    // Sistema de múltiplos jogadores
    players: [],
    jogadorAtualIndex: 0,
    ranking: [],
    cadastroCompleto: false
};

// ============================================
// ELEMENTOS DOM
// ============================================

// Tela de Cadastro
const cadastroScreen = document.getElementById('cadastro-screen') as HTMLElement;
const playerNameInput = document.getElementById('player-name-input') as HTMLInputElement;
const addPlayerBtn = document.getElementById('add-player-btn') as HTMLButtonElement;
const playersList = document.getElementById('players-list') as HTMLElement;
const startGameBtn = document.getElementById('start-game-btn') as HTMLButtonElement;
const cadastroMessage = document.getElementById('cadastro-message') as HTMLElement;

// Quiz Box
const quizBox = document.querySelector('.quiz-box') as HTMLElement;
const questionTextEl = document.getElementById('question-text') as HTMLElement;
const questionNumberEl = document.getElementById('question-number') as HTMLElement;
const scoreEl = document.getElementById('score') as HTMLElement;
const currentPlayerDisplay = document.getElementById('current-player-display') as HTMLElement;
const alternativesEls = document.querySelectorAll('.alternative') as NodeListOf<HTMLButtonElement>;
const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;

// Ranking
const rankingContainer = document.getElementById('ranking-container') as HTMLElement;
const rankingList = document.getElementById('ranking-list') as HTMLElement;

// Tela Final
const finalScreen = document.getElementById('final-screen') as HTMLElement;
const finalScoreEl = document.getElementById('final-score') as HTMLElement;
const totalQuestionsEl = document.getElementById('total-questions') as HTMLElement;
const finalRestartBtn = document.getElementById('final-restart-btn') as HTMLButtonElement;
const finalRankingList = document.getElementById('final-ranking-list') as HTMLElement;

// Timer
const timerDisplay = document.getElementById('timer-display') as HTMLElement;
const timerValue = document.getElementById('timer-value') as HTMLElement;
const timerMessage = document.getElementById('timer-message') as HTMLElement;

// Estrelas
const starsDisplay = document.getElementById('stars-display') as HTMLElement;
const starsMessage = document.getElementById('stars-message') as HTMLElement;

// ============================================
// FUNÇÕES DE CADASTRO DE JOGADORES
// ============================================

/**
 * Adiciona um novo jogador à lista
 */
function adicionarJogador(): void {
    const nome = playerNameInput.value.trim();
    
    // Validações
    if (nome === '') {
        mostrarMensagemCadastro('Nome não pode estar vazio!', 'error');
        return;
    }
    
    if (quizState.players.length >= 4) {
        mostrarMensagemCadastro('Máximo de 4 jogadores permitidos!', 'error');
        return;
    }
    
    // Verificar duplicatas
    const nomeExistente = quizState.players.find(p => p.nome.toLowerCase() === nome.toLowerCase());
    if (nomeExistente) {
        mostrarMensagemCadastro('Este nome já foi cadastrado!', 'error');
        return;
    }
    
    // Criar novo jogador
    const novoJogador: Player = {
        id: quizState.players.length + 1,
        nome: nome,
        pontuacao: 0,
        acertos: 0,
        erros: 0,
        estrelas: 0,
        respostasNoTempo: 0,
        respostasForaDoTempo: 0
    };
    
    quizState.players.push(novoJogador);
    playerNameInput.value = '';
    atualizarListaJogadores();
    mostrarMensagemCadastro('Jogador adicionado!', 'success');
    
    // Habilitar botão iniciar se tiver pelo menos 1 jogador
    if (quizState.players.length >= 1) {
        startGameBtn.disabled = false;
    }
}

/**
 * Remove um jogador da lista
 */
function removerJogador(id: number): void {
    quizState.players = quizState.players.filter(p => p.id !== id);
    // Reatribuir IDs
    quizState.players.forEach((p, index) => {
        p.id = index + 1;
    });
    atualizarListaJogadores();
    
    if (quizState.players.length === 0) {
        startGameBtn.disabled = true;
    }
}

/**
 * Atualiza a lista visual de jogadores
 */
function atualizarListaJogadores(): void {
    playersList.innerHTML = '';
    
    if (quizState.players.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'empty-players';
        emptyMsg.textContent = 'Nenhum jogador cadastrado';
        playersList.appendChild(emptyMsg);
        return;
    }
    
    quizState.players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        
        const playerName = document.createElement('span');
        playerName.className = 'player-name';
        playerName.textContent = player.nome;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-player-btn';
        removeBtn.textContent = '×';
        removeBtn.onclick = () => removerJogador(player.id);
        
        playerItem.appendChild(playerName);
        playerItem.appendChild(removeBtn);
        playersList.appendChild(playerItem);
    });
}

/**
 * Mostra mensagem de feedback no cadastro
 */
function mostrarMensagemCadastro(mensagem: string, tipo: 'success' | 'error'): void {
    cadastroMessage.textContent = mensagem;
    cadastroMessage.className = `cadastro-message ${tipo}`;
    cadastroMessage.style.display = 'block';
    
    setTimeout(() => {
        cadastroMessage.style.display = 'none';
    }, 3000);
}

/**
 * Inicia o jogo após o cadastro
 */
function iniciarJogo(): void {
    if (quizState.players.length < 1) {
        mostrarMensagemCadastro('Adicione pelo menos 1 jogador!', 'error');
        return;
    }
    
    // Inicializar ranking
    quizState.ranking = [...quizState.players];
    atualizarRanking();
    
    // Ocultar tela de cadastro e mostrar quiz
    cadastroScreen.style.display = 'none';
    quizBox.style.display = 'block';
    rankingContainer.style.display = 'block';
    
    quizState.cadastroCompleto = true;
    quizState.jogadorAtualIndex = 0;
    
    // Inicializar quiz
    inicializarQuiz();
}

/**
 * Mostra tela de cadastro
 */
function mostrarTelaCadastro(): void {
    quizState.players = [];
    quizState.cadastroCompleto = false;
    cadastroScreen.style.display = 'flex';
    quizBox.style.display = 'none';
    finalScreen.style.display = 'none';
    rankingContainer.style.display = 'none';
    startGameBtn.disabled = true;
    atualizarListaJogadores();
}

// ============================================
// FUNÇÕES DE RANKING
// ============================================

/**
 * Atualiza o ranking em tempo real
 */
function atualizarRanking(): void {
    // Ordenar por pontuação (maior primeiro), em caso de empate por acertos
    quizState.ranking = [...quizState.players].sort((a, b) => {
        if (b.pontuacao !== a.pontuacao) {
            return b.pontuacao - a.pontuacao;
        }
        return b.acertos - a.acertos;
    });
    
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

/**
 * Atualiza o ranking final na tela de fim de jogo
 */
function atualizarRankingFinal(): void {
    finalRankingList.innerHTML = '';
    
    quizState.ranking.forEach((player, index) => {
        const rankItem = document.createElement('div');
        rankItem.className = 'final-rank-item';
        
        const position = index + 1;
        const isWinner = position === 1;
        
        if (isWinner) {
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
// FUNÇÕES DO TIMER
// ============================================

/**
 * Para o timer atual se estiver ativo
 */
function pararTimer(): void {
    if (quizState.timerId !== null) {
        clearInterval(quizState.timerId);
        quizState.timerId = null;
    }
    quizState.timerAtivo = false;
}

/**
 * Inicia o timer regressivo para a pergunta atual
 */
function iniciarTimer(): void {
    // Parar qualquer timer anterior
    pararTimer();
    
    // Resetar tempo
    quizState.tempoRestante = quizState.tempoLimite;
    quizState.timerAtivo = true;
    
    // Ocultar mensagem de tempo esgotado
    timerMessage.style.display = 'none';
    timerDisplay.style.display = 'flex';
    
    // Atualizar display inicial
    atualizarDisplayTimer();
    
    // Iniciar contagem regressiva
    quizState.timerId = window.setInterval(() => {
        quizState.tempoRestante--;
        atualizarDisplayTimer();
        
        if (quizState.tempoRestante <= 0) {
            tempoEsgotado();
        }
    }, 1000);
}

/**
 * Atualiza o display visual do timer
 */
function atualizarDisplayTimer(): void {
    timerValue.textContent = quizState.tempoRestante.toString();
    
    // Mudar cor quando tempo estiver acabando
    if (quizState.tempoRestante <= 5) {
        timerDisplay.classList.add('timer-urgente');
    } else {
        timerDisplay.classList.remove('timer-urgente');
    }
}

/**
 * Função chamada quando o tempo esgota
 */
function tempoEsgotado(): void {
    pararTimer();
    
    // Marcar que esta resposta foi fora do tempo
    quizState.respostasForaDoTempo++;
    
    // Atualizar estatísticas do jogador atual
    if (quizState.players.length > 0) {
        const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
        jogadorAtual.respostasForaDoTempo++;
        jogadorAtual.erros++;
        // Não adiciona pontuação (0 pontos)
    }
    
    // Marcar como já processada (evitar múltiplas execuções)
    quizState.respostaSelecionada = -1; // Valor especial para tempo esgotado
    
    // Desabilitar todas as alternativas
    alternativesEls.forEach((btn) => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    // Destacar resposta correta
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    const respostaCorreta = pergunta.indiceCorreto;
    alternativesEls[respostaCorreta].classList.add('correct');
    
    // Mostrar mensagem de tempo esgotado
    timerMessage.style.display = 'block';
    timerDisplay.style.display = 'none';
    
    // Atualizar ranking
    atualizarRanking();
    
    // Mostrar botão de próxima
    if (quizState.perguntaAtual < quizState.perguntas.length - 1) {
        nextBtn.style.display = 'block';
    } else {
        // Última pergunta - mostrar tela final após um breve delay
        setTimeout(() => {
            finalizarQuiz();
        }, 2000);
    }
}

// ============================================
// FUNÇÕES DO SISTEMA DE ESTRELAS
// ============================================

/**
 * Calcula o número de estrelas baseado no desempenho
 * @returns Número de estrelas (0-3)
 */
function calcularEstrelas(): number {
    const totalPerguntas = quizState.perguntas.length;
    const percentualAcertos = (quizState.pontuacao / totalPerguntas) * 100;
    const estourosDeTempo = quizState.respostasForaDoTempo;
    
    // ⭐⭐⭐ (3 estrelas): 90% a 100% de acertos E nenhuma pergunta estourou o tempo
    if (percentualAcertos >= 90 && estourosDeTempo === 0) {
        return 3;
    }
    
    // ⭐⭐ (2 estrelas): 70% a 89% de acertos OU até 1 estouro de tempo (com pelo menos 70%)
    if ((percentualAcertos >= 70 && percentualAcertos < 90) || 
        (percentualAcertos >= 70 && estourosDeTempo <= 1)) {
        return 2;
    }
    
    // ⭐ (1 estrela): 50% a 69% de acertos (abaixo de 70% mas não é reprovação)
    if (percentualAcertos >= 50 && percentualAcertos < 70) {
        return 1;
    }
    
    // 0 estrelas: Reprovação (abaixo de 50%)
    return 0;
}

/**
 * Exibe as estrelas conquistadas na tela final
 */
function exibirEstrelas(): void {
    const estrelas = calcularEstrelas();
    quizState.estrelasDoNivel = estrelas;
    
    // Limpar estrelas anteriores
    starsDisplay.innerHTML = '';
    
    // Adicionar estrelas
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        
        if (i < estrelas) {
            star.classList.add('star-filled');
        } else {
            star.classList.add('star-empty');
        }
        
        starsDisplay.appendChild(star);
    }
    
    // Definir mensagem baseada no desempenho
    const totalPerguntas = quizState.perguntas.length;
    const percentualAcertos = (quizState.pontuacao / totalPerguntas) * 100;
    
    if (estrelas === 3) {
        starsMessage.textContent = 'Excelente! Você acertou tudo no tempo! ⭐⭐⭐';
        starsMessage.className = 'stars-message stars-excellent';
    } else if (estrelas === 2) {
        starsMessage.textContent = 'Bom desempenho! Continue assim! ⭐⭐';
        starsMessage.className = 'stars-message stars-good';
    } else if (estrelas === 1) {
        starsMessage.textContent = 'Continue praticando para melhorar! ⭐';
        starsMessage.className = 'stars-message stars-ok';
    } else {
        starsMessage.textContent = 'Não desista! Tente novamente!';
        starsMessage.className = 'stars-message stars-fail';
    }
}

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

function inicializarQuiz(): void {
    quizState.perguntaAtual = 0;
    quizState.pontuacao = 0;
    quizState.respostaSelecionada = null;
    quizState.jogoFinalizado = false;
    quizState.jogadorAtualIndex = 0;
    
    // Resetar estatísticas dos jogadores
    quizState.players.forEach(player => {
        player.pontuacao = 0;
        player.acertos = 0;
        player.erros = 0;
        player.estrelas = 0;
        player.respostasNoTempo = 0;
        player.respostasForaDoTempo = 0;
    });
    
    // Resetar timer
    quizState.tempoRestante = quizState.tempoLimite;
    quizState.timerAtivo = false;
    quizState.timerId = null;
    // Resetar rastreamento
    quizState.respostasNoTempo = 0;
    quizState.respostasForaDoTempo = 0;
    quizState.estrelasDoNivel = 0;
    
    // Parar qualquer timer pendente
    pararTimer();
    
    // Atualizar ranking inicial
    atualizarRanking();
    
    atualizarScore();
    mostrarPergunta();
    ocultarTelaFinal();
}

function mostrarPergunta(): void {
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    
    // Atualizar jogador atual (turnos alternados)
    if (quizState.players.length > 0) {
        quizState.jogadorAtualIndex = quizState.perguntaAtual % quizState.players.length;
        const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
        currentPlayerDisplay.textContent = `Vez de: ${jogadorAtual.nome}`;
        currentPlayerDisplay.style.display = 'block';
    } else {
        currentPlayerDisplay.style.display = 'none';
    }
    
    // Atualizar número da pergunta
    questionNumberEl.textContent = `Pergunta ${quizState.perguntaAtual + 1} de ${quizState.perguntas.length}`;
    
    // Atualizar texto da pergunta
    questionTextEl.textContent = pergunta.pergunta;
    
    // Atualizar alternativas
    alternativesEls.forEach((btn, index) => {
        const altText = btn.querySelector('.alt-text') as HTMLElement;
        altText.textContent = `: ${pergunta.alternativas[index]}`;
        
        // Resetar estados
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
        btn.style.pointerEvents = 'auto';
    });
    
    // Esconder botão de próxima
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    quizState.respostaSelecionada = null;
    
    // Iniciar timer para a nova pergunta
    iniciarTimer();
}

function selecionarAlternativa(index: number): void {
    // Prevenir múltiplas seleções
    if (quizState.respostaSelecionada !== null) {
        return;
    }
    
    // Se o timer não estiver ativo, não permitir resposta (tempo esgotado)
    if (!quizState.timerAtivo) {
        return;
    }
    
    quizState.respostaSelecionada = index;
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    const respostaCorreta = pergunta.indiceCorreto;
    
    // Parar o timer imediatamente
    pararTimer();
    
    // Marcar que a resposta foi no tempo
    quizState.respostasNoTempo++;
    
    // Atualizar estatísticas do jogador atual
    const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
    jogadorAtual.respostasNoTempo++;
    
    // Desabilitar todos os botões
    alternativesEls.forEach((btn) => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    // Marcar resposta correta
    alternativesEls[respostaCorreta].classList.add('correct');
    
    // Se a resposta estiver errada, marcar como incorreta
    if (index !== respostaCorreta) {
        alternativesEls[index].classList.add('incorrect');
        jogadorAtual.erros++;
        // 0 pontos para resposta errada
    } else {
        // Incrementar pontuação se acertou (+10 pontos)
        jogadorAtual.pontuacao += 10;
        jogadorAtual.acertos++;
        quizState.pontuacao++;
        atualizarScore();
    }
    
    // Atualizar ranking
    atualizarRanking();
    
    // Mostrar botão de próxima
    if (quizState.perguntaAtual < quizState.perguntas.length - 1) {
        nextBtn.style.display = 'block';
    } else {
        // Última pergunta - mostrar tela final após um breve delay
        setTimeout(() => {
            finalizarQuiz();
        }, 1500);
    }
}

function proximaPergunta(): void {
    quizState.perguntaAtual++;
    
    if (quizState.perguntaAtual < quizState.perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz(): void {
    quizState.jogoFinalizado = true;
    
    // Parar timer se ainda estiver ativo
    pararTimer();
    
    // Atualizar ranking final
    atualizarRanking();
    atualizarRankingFinal();
    
    // Mostrar tela final
    quizBox.style.display = 'none';
    rankingContainer.style.display = 'none';
    finalScreen.style.display = 'block';
    
    // Calcular pontuação total se houver jogadores
    if (quizState.players.length > 0) {
        const totalPontos = quizState.players.reduce((sum, p) => sum + p.pontuacao, 0);
        finalScoreEl.textContent = totalPontos.toString();
    } else {
        finalScoreEl.textContent = quizState.pontuacao.toString();
    }
    
    totalQuestionsEl.textContent = quizState.perguntas.length.toString();
    
    // Calcular e exibir estrelas (se for modo single player)
    if (quizState.players.length === 0) {
        exibirEstrelas();
    } else {
        starsDisplay.style.display = 'none';
        starsMessage.style.display = 'none';
    }
}

function ocultarTelaFinal(): void {
    finalScreen.style.display = 'none';
    quizBox.style.display = 'block';
}

function atualizarScore(): void {
    // Mostrar pontuação do jogador atual ou total
    if (quizState.players.length > 0) {
        const jogadorAtual = quizState.players[quizState.jogadorAtualIndex];
        scoreEl.textContent = jogadorAtual.pontuacao.toString();
    } else {
        scoreEl.textContent = quizState.pontuacao.toString();
    }
}

// Event Listeners
alternativesEls.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        selecionarAlternativa(index);
    });
});

nextBtn.addEventListener('click', () => {
    proximaPergunta();
});

restartBtn.addEventListener('click', () => {
    mostrarTelaCadastro();
});

finalRestartBtn.addEventListener('click', () => {
    mostrarTelaCadastro();
});

// Event Listeners do Cadastro
addPlayerBtn.addEventListener('click', () => {
    adicionarJogador();
});

playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarJogador();
    }
});

startGameBtn.addEventListener('click', () => {
    iniciarJogo();
});

// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    mostrarTelaCadastro();
});

