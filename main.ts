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
    jogoFinalizado: false
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

// Funções principais
function inicializarQuiz(): void {
    quizState.perguntaAtual = 0;
    quizState.pontuacao = 0;
    quizState.respostaSelecionada = null;
    quizState.jogoFinalizado = false;
    
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
}

function selecionarAlternativa(index: number): void {
    // Prevenir múltiplas seleções
    if (quizState.respostaSelecionada !== null) {
        return;
    }
    
    quizState.respostaSelecionada = index;
    const pergunta = quizState.perguntas[quizState.perguntaAtual];
    const respostaCorreta = pergunta.indiceCorreto;
    
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
    
    // Mostrar tela final
    quizBox.style.display = 'none';
    finalScreen.style.display = 'block';
    
    finalScoreEl.textContent = quizState.pontuacao.toString();
    totalQuestionsEl.textContent = quizState.perguntas.length.toString();
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

