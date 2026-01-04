// ============================================
// DIFFICULTY MANAGER - Dificuldade Adaptativa
// ============================================

import { PlayerStats, Pergunta } from '../types';


/**
 * Gerenciador de dificuldade adaptativa
 * Ajusta a seleção de perguntas baseado no desempenho do jogador
 */
export class DifficultyManager {
    // Expor globalmente para uso no main.ts
    static init(): void {
        (window as any).DifficultyManager = DifficultyManager;
    }
    /**
     * Calcula estatísticas do jogador baseado no histórico
     */
    static calculatePlayerStats(player: {
        acertos: number;
        erros: number;
        respostasNoTempo: number;
        respostasForaDoTempo: number;
        tempoRespostas?: number[]; // histórico de tempos (opcional)
    }): PlayerStats {
        const totalRespostas = player.acertos + player.erros;
        const taxaAcertos = totalRespostas > 0 
            ? player.acertos / totalRespostas 
            : 0;
        
        // Tempo médio estimado (se não tiver histórico, estima baseado em respostas no tempo)
        const tempoMedioResposta = player.tempoRespostas && player.tempoRespostas.length > 0
            ? player.tempoRespostas.reduce((a, b) => a + b, 0) / player.tempoRespostas.length
            : player.respostasNoTempo > 0 ? 8 : 15; // Estimativa
        
        return {
            taxaAcertos,
            tempoMedioResposta,
            errosConsecutivos: 0, // Será atualizado durante o jogo
            totalAcertos: player.acertos,
            totalErros: player.erros,
            respostasNoTempo: player.respostasNoTempo,
            respostasForaDoTempo: player.respostasForaDoTempo
        };
    }

    /**
     * Seleciona a próxima pergunta baseado no desempenho
     * NÃO altera o nível, apenas filtra/ordena perguntas do nível atual
     */
    static getNextQuestion(
        perguntas: Pergunta[],
        nivelAtual: number,
        playerStats: PlayerStats,
        perguntasJaUsadas: number[] = []
    ): Pergunta | null {
        if (perguntas.length === 0) return null;
        
        // Filtrar perguntas já usadas
        const perguntasDisponiveis = perguntas.filter(
            p => !perguntasJaUsadas.includes(p.id)
        );
        
        if (perguntasDisponiveis.length === 0) {
            // Se todas foram usadas, resetar lista
            return perguntas[Math.floor(Math.random() * perguntas.length)];
        }
        
        // Lógica de adaptação baseada no desempenho
        let perguntasSelecionadas: Pergunta[];
        
        // SE: Acertos > 80% E tempo médio < 7s
        // ENTÃO: Priorizar perguntas mais difíceis
        if (playerStats.taxaAcertos > 0.8 && playerStats.tempoMedioResposta < 7) {
            perguntasSelecionadas = this.selectHarderQuestions(perguntasDisponiveis);
        }
        // SE: Acertos < 50% OU 3 erros consecutivos
        // ENTÃO: Priorizar perguntas mais fáceis
        else if (playerStats.taxaAcertos < 0.5 || playerStats.errosConsecutivos >= 3) {
            perguntasSelecionadas = this.selectEasierQuestions(perguntasDisponiveis);
        }
        // CASO CONTRÁRIO: Seleção balanceada
        else {
            perguntasSelecionadas = perguntasDisponiveis;
        }
        
        // Selecionar aleatoriamente do grupo selecionado
        if (perguntasSelecionadas.length === 0) {
            perguntasSelecionadas = perguntasDisponiveis;
        }
        
        const randomIndex = Math.floor(Math.random() * perguntasSelecionadas.length);
        return perguntasSelecionadas[randomIndex];
    }

    /**
     * Seleciona perguntas mais difíceis
     * Critério: Perguntas com alternativas mais longas (considerando mais difíceis)
     */
    private static selectHarderQuestions(perguntas: Pergunta[]): Pergunta[] {
        return perguntas
            .map(p => ({
                pergunta: p,
                dificuldade: this.estimateDifficulty(p)
            }))
            .sort((a, b) => b.dificuldade - a.dificuldade)
            .slice(0, Math.ceil(perguntas.length * 0.4)) // Top 40% mais difíceis
            .map(item => item.pergunta);
    }

    /**
     * Seleciona perguntas mais fáceis
     * Critério: Perguntas com alternativas mais curtas
     */
    private static selectEasierQuestions(perguntas: Pergunta[]): Pergunta[] {
        return perguntas
            .map(p => ({
                pergunta: p,
                dificuldade: this.estimateDifficulty(p)
            }))
            .sort((a, b) => a.dificuldade - b.dificuldade)
            .slice(0, Math.ceil(perguntas.length * 0.4)) // Top 40% mais fáceis
            .map(item => item.pergunta);
    }

    /**
     * Estima dificuldade de uma pergunta
     * Baseado em: comprimento do texto, comprimento das alternativas
     */
    private static estimateDifficulty(pergunta: Pergunta): number {
        const comprimentoPergunta = pergunta.pergunta.length;
        const comprimentoMedioAlternativas = pergunta.alternativas.reduce(
            (sum, alt) => sum + alt.length, 0
        ) / pergunta.alternativas.length;
        
        // Dificuldade = média ponderada
        return (comprimentoPergunta * 0.3) + (comprimentoMedioAlternativas * 0.7);
    }

    /**
     * Atualiza contador de erros consecutivos
     */
    static updateConsecutiveErrors(
        stats: PlayerStats,
        acertou: boolean
    ): PlayerStats {
        return {
            ...stats,
            errosConsecutivos: acertou ? 0 : stats.errosConsecutivos + 1
        };
    }
}

// Expor globalmente ao carregar
if (typeof window !== 'undefined') {
    DifficultyManager.init();
}

