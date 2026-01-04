// ============================================
// TIPOS CENTRALIZADOS DO PROJETO
// ============================================

/**
 * Interface para uma pergunta do quiz
 */
export interface Pergunta {
    id: number;
    pergunta: string;
    alternativas: string[];
    indiceCorreto: number;
}

/**
 * Interface para um jogador
 */
export interface Player {
    id: number;
    nome: string;
    pontuacao: number;
    acertos: number;
    erros: number;
    estrelas: number;
    respostasNoTempo: number;
    respostasForaDoTempo: number;
}

/**
 * Estado completo do quiz
 */
export interface QuizState {
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
    // Sistema de níveis e dificuldade adaptativa
    nivelAtual: number;
    perguntasJaUsadas: number[];
    playerStatsCache: { [playerId: number]: PlayerStats };
}

/**
 * Estatísticas do jogador para dificuldade adaptativa
 */
export interface PlayerStats {
    taxaAcertos: number;
    tempoMedioResposta: number;
    errosConsecutivos: number;
    totalAcertos: number;
    totalErros: number;
    respostasNoTempo: number;
    respostasForaDoTempo: number;
}

/**
 * Estado da aplicação (telas)
 */
export type ScreenType = 'menu' | 'playerMenu' | 'game' | 'final';

/**
 * Estado da aplicação principal
 */
export interface AppState {
    currentScreen: ScreenType;
    players: Player[];
    gameStarted: boolean;
    isPresentationMode: boolean;
}

