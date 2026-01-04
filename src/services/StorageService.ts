// ============================================
// STORAGE SERVICE - Gerenciamento LocalStorage
// ============================================

/**
 * Interface para dados salvos no LocalStorage
 */
export interface SavedGameState {
    players: Player[];
    perguntaAtual: number;
    nivelAtual: number;
    dataPartida: string;
    timestamp: number;
}

/**
 * Interface para Player (compatível com main.ts)
 */
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

/**
 * Chave padrão para armazenamento
 */
const STORAGE_KEY = 'quizbiblia_ranking';

/**
 * Serviço para gerenciar persistência no LocalStorage
 */
export class StorageService {
    // Expor globalmente para uso no main.ts
    static init(): void {
        (window as any).StorageService = StorageService;
    }
    /**
     * Salva o estado atual do jogo
     */
    static saveGameState(state: {
        players: Player[];
        perguntaAtual: number;
        nivelAtual?: number;
    }): void {
        try {
            const savedState: SavedGameState = {
                players: state.players.map(p => ({ ...p })),
                perguntaAtual: state.perguntaAtual,
                nivelAtual: state.nivelAtual || 1,
                dataPartida: new Date().toISOString(),
                timestamp: Date.now()
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
        } catch (error) {
            console.warn('Erro ao salvar estado do jogo:', error);
        }
    }

    /**
     * Carrega o estado salvo do jogo
     */
    static loadGameState(): SavedGameState | null {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return null;
            
            const state = JSON.parse(saved) as SavedGameState;
            
            // Validar estrutura dos dados
            if (!state.players || !Array.isArray(state.players)) {
                return null;
            }
            
            return state;
        } catch (error) {
            console.warn('Erro ao carregar estado do jogo:', error);
            return null;
        }
    }

    /**
     * Limpa o estado salvo do jogo
     */
    static clearGameState(): void {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.warn('Erro ao limpar estado do jogo:', error);
        }
    }

    /**
     * Verifica se existe um jogo salvo
     */
    static hasSavedGame(): boolean {
        return this.loadGameState() !== null;
    }

    /**
     * Obtém apenas o ranking salvo (para exibição)
     */
    static getSavedRanking(): Player[] {
        const state = this.loadGameState();
        return state ? state.players : [];
    }
}

// Expor globalmente ao carregar
if (typeof window !== 'undefined') {
    StorageService.init();
}

