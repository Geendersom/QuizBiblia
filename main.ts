// Interfaces e Tipos
interface Pergunta {
    id: number;
    pergunta: string;
    alternativas: string[];
    indiceCorreto: number;
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

// Estado do Quiz
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
    estrelasDoNivel: 0
};

// Elementos DOM
const questionTextEl = document.getElementById('question-text') as HTMLElement;
const questionNumberEl = document.getElementById('question-number') as HTMLElement;
const scoreEl = document.getElementById('score') as HTMLElement;
const alternativesEls = document.querySelectorAll('.alternative') as NodeListOf<HTMLButtonElement>;
const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;
const quizBox = document.querySelector('.quiz-box') as HTMLElement;
const finalScreen = document.getElementById('final-screen') as HTMLElement;
const finalScoreEl = document.getElementById('final-score') as HTMLElement;
const totalQuestionsEl = document.getElementById('total-questions') as HTMLElement;
const finalRestartBtn = document.getElementById('final-restart-btn') as HTMLButtonElement;
// Elementos do Timer
const timerDisplay = document.getElementById('timer-display') as HTMLElement;
const timerValue = document.getElementById('timer-value') as HTMLElement;
const timerMessage = document.getElementById('timer-message') as HTMLElement;
// Elementos das Estrelas
const starsDisplay = document.getElementById('stars-display') as HTMLElement;
const starsMessage = document.getElementById('stars-message') as HTMLElement;

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
    
    // Não incrementar pontuação (resposta errada por tempo)
    
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
    
    atualizarScore();
    mostrarPergunta();
    ocultarTelaFinal();
}

function mostrarPergunta(): void {
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    
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
    } else {
        // Incrementar pontuação se acertou
        quizState.pontuacao++;
        atualizarScore();
    }
    
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
    
    // Mostrar tela final
    quizBox.style.display = 'none';
    finalScreen.style.display = 'block';
    
    finalScoreEl.textContent = quizState.pontuacao.toString();
    totalQuestionsEl.textContent = quizState.perguntas.length.toString();
    
    // Calcular e exibir estrelas
    exibirEstrelas();
}

function ocultarTelaFinal(): void {
    finalScreen.style.display = 'none';
    quizBox.style.display = 'block';
}

function atualizarScore(): void {
    scoreEl.textContent = quizState.pontuacao.toString();
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
    inicializarQuiz();
});

finalRestartBtn.addEventListener('click', () => {
    inicializarQuiz();
});

// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    inicializarQuiz();
});

