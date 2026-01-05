// Desenvolvido por Geêndersom Araújo e Gerlano Araújo

// ============================================
// COMPONENTE: CONTROLE DE ÁUDIO
// ============================================

import { AudioService } from '../services/AudioService.js';

export class AudioControl {
    private container: HTMLElement;
    private button: HTMLButtonElement | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    /**
     * Renderiza o controle de áudio
     */
    render(): void {
        const isMuted = AudioService.getIsMuted();
        
        this.container.innerHTML = `
            <button 
                id="audio-toggle-btn" 
                class="audio-toggle-btn" 
                aria-label="${isMuted ? 'Ativar som' : 'Desativar som'}"
                title="${isMuted ? 'Ativar som' : 'Desativar som'}"
            >
                <span class="audio-icon">${isMuted ? '🔇' : '🔊'}</span>
            </button>
        `;

        this.button = this.container.querySelector('#audio-toggle-btn') as HTMLButtonElement;
        this.attachListeners();
    }

    /**
     * Anexa event listeners
     */
    private attachListeners(): void {
        if (!this.button) return;

        this.button.addEventListener('click', () => {
            const isNowMuted = AudioService.toggleMute();
            this.updateIcon(isNowMuted);
            
            // Tocar som de clique para feedback imediato
            if (!isNowMuted) {
                AudioService.playClick();
            }
        });
    }

    /**
     * Atualiza o ícone do botão
     */
    updateIcon(isMuted: boolean): void {
        if (!this.button) return;

        const icon = this.button.querySelector('.audio-icon');
        if (icon) {
            icon.textContent = isMuted ? '🔇' : '🔊';
        }

        this.button.setAttribute('aria-label', isMuted ? 'Ativar som' : 'Desativar som');
        this.button.setAttribute('title', isMuted ? 'Ativar som' : 'Desativar som');
    }

    /**
     * Atualiza o estado visual (chamado quando mute muda externamente)
     */
    refresh(): void {
        const isMuted = AudioService.getIsMuted();
        this.updateIcon(isMuted);
    }
}

