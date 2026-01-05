// Desenvolvido por Geêndersom Araújo e Gerlano Araújo

// ============================================
// COMPONENTE: RANKING
// ============================================

import { Player } from '../types.js';

export class Ranking {
    private container: HTMLElement;
    private listContainer: HTMLElement;

    constructor(container: HTMLElement, listContainer: HTMLElement) {
        this.container = container;
        this.listContainer = listContainer;
    }

    /**
     * Atualiza o ranking com os players fornecidos
     */
    update(players: Player[]): void {
        const ranking = [...players].sort((a, b) => {
            if (b.pontuacao !== a.pontuacao) {
                return b.pontuacao - a.pontuacao;
            }
            return b.acertos - a.acertos;
        });

        this.listContainer.innerHTML = '';

        ranking.forEach((player, index) => {
            const rankItem = document.createElement('div');
            rankItem.className = 'rank-item';

            const position = index + 1;
            const positionClass = position === 1 ? 'rank-1' : position === 2 ? 'rank-2' : position === 3 ? 'rank-3' : '';

            rankItem.innerHTML = `
                <span class="rank-position ${positionClass}">${position}º</span>
                <span class="rank-name">${player.nome}</span>
                <span class="rank-score">${player.pontuacao} pts</span>
            `;

            this.listContainer.appendChild(rankItem);
        });
    }

    /**
     * Mostra o ranking
     */
    show(): void {
        if (this.container) {
            this.container.style.display = 'block';
        }
    }

    /**
     * Oculta o ranking
     */
    hide(): void {
        if (this.container) {
            this.container.style.display = 'none';
        }
    }
}

