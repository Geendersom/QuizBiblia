// ============================================
// RANKING SERVICE - Estrutura base para ranking online
// ============================================

/**
 * Interface para envio de score ao servidor
 */
export interface ScoreData {
    playerId: number;
    playerName: string;
    score: number;
    stars: number;
    levelReached: number;
    createdAt: string;
    acertos: number;
    erros: number;
}

/**
 * Interface para resposta do ranking online
 */
export interface OnlineRankingEntry {
    playerId: number;
    playerName: string;
    score: number;
    stars: number;
    levelReached: number;
    rank: number;
    createdAt: string;
}

/**
 * Interface para Player (compatível)
 */
interface Player {
    id: number;
    nome: string;
    pontuacao: number;
    acertos: number;
    erros: number;
    estrelas: number;
}

/**
 * Serviço para gerenciar ranking (local e preparado para online)
 */
export class RankingService {
    // Expor globalmente para uso no main.ts
    static init(): void {
        (window as any).RankingService = RankingService;
    }
    private static readonly API_BASE_URL = 'https://api.quizbiblia.com/v1'; // Placeholder para futuro
    
    /**
     * Obtém ranking local (do LocalStorage)
     */
    static getLocalRanking(): Player[] {
        // Acessar StorageService via window (se disponível)
        if (typeof (window as any).StorageService !== 'undefined') {
            return (window as any).StorageService.getSavedRanking();
        }
        
        // Fallback: buscar diretamente do localStorage
        try {
            const saved = localStorage.getItem('quizbiblia_ranking');
            if (saved) {
                const state = JSON.parse(saved);
                return state.players || [];
            }
        } catch (error) {
            console.warn('Erro ao buscar ranking local:', error);
        }
        
        return [];
    }

    /**
     * Envia score para o servidor (MOCK - preparado para implementação real)
     * 
     * TODO: Substituir por fetch real quando backend estiver pronto
     * Exemplo:
     * return fetch(`${this.API_BASE_URL}/scores`, {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify(scoreData)
     * });
     */
    static async submitScore(scoreData: ScoreData): Promise<boolean> {
        try {
            // SIMULAÇÃO: Aguarda 200ms como se fosse uma requisição
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Em produção, aqui seria:
            // const response = await fetch(`${this.API_BASE_URL}/scores`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(scoreData)
            // });
            // return response.ok;
            
            console.log('[RankingService] Score enviado (simulado):', scoreData);
            return true;
        } catch (error) {
            console.error('Erro ao enviar score:', error);
            return false;
        }
    }

    /**
     * Busca ranking online (MOCK - retorna dados simulados)
     * 
     * TODO: Substituir por fetch real quando backend estiver pronto
     * Exemplo:
     * const response = await fetch(`${this.API_BASE_URL}/ranking`);
     * return await response.json();
     */
    static async fetchOnlineRanking(limit: number = 10): Promise<OnlineRankingEntry[]> {
        try {
            // SIMULAÇÃO: Aguarda 300ms como se fosse uma requisição
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Em produção, aqui seria:
            // const response = await fetch(`${this.API_BASE_URL}/ranking?limit=${limit}`);
            // return await response.json();
            
            // Retorna ranking simulado
            const mockRanking: OnlineRankingEntry[] = [
                {
                    playerId: 1,
                    playerName: 'Jogador Top',
                    score: 500,
                    stars: 3,
                    levelReached: 3,
                    rank: 1,
                    createdAt: new Date().toISOString()
                },
                {
                    playerId: 2,
                    playerName: 'Mestre Bíblico',
                    score: 450,
                    stars: 3,
                    levelReached: 3,
                    rank: 2,
                    createdAt: new Date().toISOString()
                },
                {
                    playerId: 3,
                    playerName: 'Estudante',
                    score: 350,
                    stars: 2,
                    levelReached: 2,
                    rank: 3,
                    createdAt: new Date().toISOString()
                }
            ];
            
            console.log('[RankingService] Ranking online obtido (simulado)');
            return mockRanking.slice(0, limit);
        } catch (error) {
            console.error('Erro ao buscar ranking online:', error);
            return [];
        }
    }

    /**
     * Prepara dados do player para envio
     */
    static prepareScoreData(player: Player, nivelAtual: number): ScoreData {
        return {
            playerId: player.id,
            playerName: player.nome,
            score: player.pontuacao,
            stars: player.estrelas,
            levelReached: nivelAtual,
            createdAt: new Date().toISOString(),
            acertos: player.acertos,
            erros: player.erros
        };
    }
}

// Expor globalmente ao carregar
if (typeof window !== 'undefined') {
    RankingService.init();
}

