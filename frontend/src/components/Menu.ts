// Desenvolvido por Geêndersom Araújo e Gerlano Araújo

// ============================================
// COMPONENTE: MENU INICIAL
// ============================================

import { AppState } from '../types';
import { AudioService } from '../services/AudioService';

export class Menu {
    private container: HTMLElement;
    private onStartGame: () => void;
    private onManagePlayers: () => void;
    private onTogglePresentationMode?: (enabled: boolean) => void;

    constructor(
        container: HTMLElement,
        onStartGame: () => void,
        onManagePlayers: () => void,
        onTogglePresentationMode?: (enabled: boolean) => void
    ) {
        this.container = container;
        this.onStartGame = onStartGame;
        this.onManagePlayers = onManagePlayers;
        this.onTogglePresentationMode = onTogglePresentationMode;
    }

    /**
     * Renderiza o menu inicial
     */
    render(playersCount: number, isPresentationMode: boolean = false): void {
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
                        
                        <button id="btn-presentation-mode" class="btn-secondary ${isPresentationMode ? 'active' : ''}" title="Modo Apresentação para telão">
                            <span class="btn-icon">📺</span>
                            <span>${isPresentationMode ? 'DESATIVAR' : 'ATIVAR'} MODO APRESENTAÇÃO</span>
                        </button>
                    </div>
                    
                    ${playersCount === 0 ? 
                        '<p class="menu-warning">Adicione pelo menos 1 jogador para iniciar</p>' : 
                        `<p class="menu-info">${playersCount} jogador${playersCount > 1 ? 'es' : ''} cadastrado${playersCount > 1 ? 's' : ''}</p>`
                    }
                    
                    ${isPresentationMode ? 
                        '<p class="menu-info presentation-mode-indicator">📺 Modo Apresentação Ativo</p>' : 
                        ''
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
        const presentationBtn = document.getElementById('btn-presentation-mode') as HTMLButtonElement | null;

        startBtn?.addEventListener('click', () => {
            if (startBtn.disabled) return;
            AudioService.playClick();
            this.onStartGame();
        });

        manageBtn?.addEventListener('click', () => {
            AudioService.playClick();
            this.onManagePlayers();
        });

        presentationBtn?.addEventListener('click', () => {
            AudioService.playClick();
            const isActive = presentationBtn.classList.contains('active');
            if (this.onTogglePresentationMode) {
                this.onTogglePresentationMode(!isActive);
            }
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

