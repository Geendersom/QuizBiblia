// ============================================
// COMPONENTE: MENU INICIAL
// ============================================

import { AppState } from '../types';
import { AudioService } from '../services/AudioService';

export class Menu {
    private container: HTMLElement;
    private onStartGame: () => void;
    private onManagePlayers: () => void;

    constructor(
        container: HTMLElement,
        onStartGame: () => void,
        onManagePlayers: () => void
    ) {
        this.container = container;
        this.onStartGame = onStartGame;
        this.onManagePlayers = onManagePlayers;
    }

    /**
     * Renderiza o menu inicial
     */
    render(playersCount: number): void {
        this.container.innerHTML = `
            <div class="menu-screen">
                <div class="menu-content">
                    <h1 class="menu-title">Quiz Bíblia</h1>
                    <p class="menu-subtitle">Teste seu conhecimento bíblico</p>
                    
                    <div class="menu-buttons">
                        <button id="btn-start-game" class="btn-primary" ${playersCount === 0 ? 'disabled' : ''}>
                            <span class="btn-icon">▶</span>
                            <span>INICIAR JOGO</span>
                        </button>
                        
                        <button id="btn-manage-players" class="btn-secondary">
                            <span class="btn-icon">👥</span>
                            <span>GERENCIAR JOGADORES</span>
                        </button>
                    </div>
                    
                    ${playersCount === 0 ? 
                        '<p class="menu-warning">Adicione pelo menos 1 jogador para iniciar</p>' : 
                        `<p class="menu-info">${playersCount} jogador${playersCount > 1 ? 'es' : ''} cadastrado${playersCount > 1 ? 's' : ''}</p>`
                    }
                </div>
            </div>
        `;

        this.attachListeners();
    }

    /**
     * Anexa os event listeners
     */
    private attachListeners(): void {
        const startBtn = document.getElementById('btn-start-game') as HTMLButtonElement | null;
        const manageBtn = document.getElementById('btn-manage-players') as HTMLButtonElement | null;

        startBtn?.addEventListener('click', () => {
            if (startBtn.disabled) return;
            AudioService.playClick();
            this.onStartGame();
        });

        manageBtn?.addEventListener('click', () => {
            AudioService.playClick();
            this.onManagePlayers();
        });
    }

    /**
     * Mostra o menu
     */
    show(): void {
        this.container.style.display = 'flex';
    }

    /**
     * Oculta o menu
     */
    hide(): void {
        this.container.style.display = 'none';
    }
}

