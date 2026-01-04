// ============================================
// UTILITÁRIOS - RANDOMIZAÇÃO
// ============================================

/**
 * Embaralha um array usando algoritmo Fisher-Yates
 * @param array Array a ser embaralhado
 * @returns Novo array embaralhado (não modifica o original)
 */
export function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Embaralha perguntas de um nível
 * @param perguntas Array de perguntas
 * @returns Novo array de perguntas embaralhadas
 */
export function shuffleQuestions<T extends { id: number }>(perguntas: T[]): T[] {
    return shuffle(perguntas);
}

