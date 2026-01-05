// Desenvolvido por Geêndersom Araújo e Gerlano Araújo

// ============================================
// ADAPTADOR DE PERGUNTAS
// ============================================

import { LEVELS, Question as LevelQuestion, Level } from './questions.js';
import { Pergunta } from '../types.js';
import { shuffleQuestions } from '../utils/shuffle.js';

/**
 * Converte Question do formato LEVELS para Pergunta do formato do jogo
 */
function convertQuestion(levelQuestion: LevelQuestion): Pergunta {
    return {
        id: levelQuestion.id,
        pergunta: levelQuestion.pergunta,
        alternativas: levelQuestion.alternativas,
        indiceCorreto: levelQuestion.correta
    };
}

/**
 * Obtém perguntas de um nível específico, embaralhadas
 */
export function getLevelQuestions(nivel: number): Pergunta[] {
    const level = LEVELS.find(l => l.id === nivel);
    if (!level) {
        return [];
    }

    // Converter e embaralhar
    const perguntas = level.perguntas.map(convertQuestion);
    return shuffleQuestions(perguntas);
}

/**
 * Obtém todos os níveis disponíveis
 */
export function getAllLevels(): Level[] {
    return LEVELS;
}

/**
 * Obtém um nível específico
 */
export function getLevel(nivel: number): Level | undefined {
    return LEVELS.find(l => l.id === nivel);
}

