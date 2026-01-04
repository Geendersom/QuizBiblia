// ============================================
// COMPONENTE: MENU DE JOGADORES
// ============================================

import { Player } from '../types';

export class PlayerMenu {
    private container: HTMLElement;
    private players: Player[] = [];
    private onClose: () => void;
    private onPlayersChanged: (players: Player[]) => void;

    constructor(
        container: HTMLElement,
        onClose: () => void,
        onPlayersChanged: (players: Player[]) => void
    ) {
        this.container = container;
        this.onClose = onClose;
        this.onPlayersChanged = onPlayersChanged;
    }

    /**
     * Define os jogadores atuais
     */
    setPlayers(players: Player[]): void {
        this.players = [...players];
        this.render();
    }

    /**
     * Renderiza o menu de jogadores
     */
    render(): void {
        this.container.innerHTML = `
            <div class="player-menu-overlay">
                <div class="player-menu-content">
                    <div class="player-menu-header">
                        <h2>Gerenciar Jogadores</h2>
                        <button id="btn-close-players" class="btn-close" aria-label="Fechar">×</button>
                    </div>
                    
                    <div class="player-menu-body">
                        <div class="cadastro-input-group">
                            <input 
                                type="text" 
                                id="player-name-input" 
                                class="player-name-input" 
                                placeholder="Digite o nome do jogador"
                                maxlength="20"
                                autocomplete="off"
                            >
                            <button id="btn-add-player" class="btn-add-player">Adicionar</button>
                        </div>
                        
                        <div id="cadastro-message" class="cadastro-message" style="display: none;"></div>
                        
                        <div class="players-list-container">
                            <h3>Jogadores Cadastrados <span class="players-count">(${this.players.length}/4)</span></h3>
                            <div id="players-list" class="players-list"></div>
                        </div>
                    </div>
                    
                    <div class="player-menu-footer">
                        <button id="btn-save-players" class="btn-primary">Confirmar</button>
                    </div>
                </div>
            </div>
        `;

        this.renderPlayersList();
        this.attachListeners();
    }

    /**
     * Renderiza a lista de jogadores
     */
    private renderPlayersList(): void {
        const listContainer = document.getElementById('players-list');
        if (!listContainer) return;

        if (this.players.length === 0) {
            listContainer.innerHTML = '<p class="empty-players">Nenhum jogador cadastrado</p>';
            return;
        }

        listContainer.innerHTML = this.players.map((player, index) => `
            <div class="player-item" data-id="${player.id}">
                <span class="player-number">${index + 1}</span>
                <span class="player-name">${this.escapeHtml(player.nome)}</span>
                <button class="remove-player-btn" data-id="${player.id}" aria-label="Remover jogador">×</button>
            </div>
        `).join('');
    }

    /**
     * Anexa os event listeners
     */
    private attachListeners(): void {
        const closeBtn = document.getElementById('btn-close-players');
        const addBtn = document.getElementById('btn-add-player');
        const saveBtn = document.getElementById('btn-save-players');
        const input = document.getElementById('player-name-input') as HTMLInputElement;
        const listContainer = document.getElementById('players-list');

        // Fechar menu
        closeBtn?.addEventListener('click', () => {
            this.onClose();
        });

        // Adicionar jogador
        addBtn?.addEventListener('click', () => {
            this.adicionarJogador(input);
        });

        // Enter no input
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.adicionarJogador(input);
            }
        });

        // Remover jogador
        listContainer?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('remove-player-btn')) {
                const id = parseInt(target.getAttribute('data-id') || '0');
                this.removerJogador(id);
            }
        });

        // Salvar e fechar
        saveBtn?.addEventListener('click', () => {
            this.onPlayersChanged([...this.players]);
            this.onClose();
        });

        // Fechar ao clicar no overlay
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container.querySelector('.player-menu-overlay')) {
                this.onClose();
            }
        });
    }

    /**
     * Adiciona um jogador
     */
    private adicionarJogador(input: HTMLInputElement): void {
        const nome = input.value.trim();

        if (nome === '') {
            this.mostrarMensagem('Nome não pode estar vazio!', 'error');
            return;
        }

        if (this.players.length >= 4) {
            this.mostrarMensagem('Máximo de 4 jogadores permitidos!', 'error');
            return;
        }

        const nomeExistente = this.players.find(p => p.nome.toLowerCase() === nome.toLowerCase());
        if (nomeExistente) {
            this.mostrarMensagem('Este nome já foi cadastrado!', 'error');
            return;
        }

        const novoJogador: Player = {
            id: this.players.length > 0 ? Math.max(...this.players.map(p => p.id)) + 1 : 1,
            nome: nome,
            pontuacao: 0,
            acertos: 0,
            erros: 0,
            estrelas: 0,
            respostasNoTempo: 0,
            respostasForaDoTempo: 0
        };

        this.players.push(novoJogador);
        input.value = '';
        this.render();
        this.mostrarMensagem('Jogador adicionado!', 'success');
    }

    /**
     * Remove um jogador
     */
    private removerJogador(id: number): void {
        this.players = this.players.filter(p => p.id !== id);
        // Reatribuir IDs
        this.players.forEach((p, index) => {
            p.id = index + 1;
        });
        this.render();
    }

    /**
     * Mostra mensagem de feedback
     */
    private mostrarMensagem(mensagem: string, tipo: 'success' | 'error'): void {
        const messageEl = document.getElementById('cadastro-message');
        if (!messageEl) return;

        messageEl.textContent = mensagem;
        messageEl.className = `cadastro-message ${tipo}`;
        messageEl.style.display = 'block';

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    /**
     * Escape HTML para segurança
     */
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Mostra o menu
     */
    show(): void {
        this.container.style.display = 'flex';
        const input = document.getElementById('player-name-input') as HTMLInputElement;
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    /**
     * Oculta o menu
     */
    hide(): void {
        this.container.style.display = 'none';
    }
}

