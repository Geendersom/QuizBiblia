// ============================================
// COMPONENTE: TELA DE JOGO
// ============================================

import { Pergunta, Player } from '../types';

export class GameScreen {
    private container: HTMLElement;
    private questionTextEl: HTMLElement;
    private questionNumberEl: HTMLElement;
    private alternativesEls: NodeListOf<HTMLButtonElement>;
    private currentPlayerDisplay: HTMLElement;
    
    constructor(container: HTMLElement) {
        this.container = container;
        this.questionTextEl = document.getElementById('question-text') as HTMLElement;
        this.questionNumberEl = document.getElementById('question-number') as HTMLElement;
        this.alternativesEls = document.querySelectorAll('.alternative') as NodeListOf<HTMLButtonElement>;
        this.currentPlayerDisplay = document.getElementById('current-player-display') as HTMLElement;
    }

    /**
     * Exibe uma pergunta
     */
    showQuestion(
        pergunta: Pergunta,
        perguntaAtual: number,
        totalPerguntas: number,
        jogadorAtual: Player | null
    ): void {
        // Atualizar jogador atual
        if (jogadorAtual && this.currentPlayerDisplay) {
            this.currentPlayerDisplay.textContent = `Vez de: ${jogadorAtual.nome}`;
            this.currentPlayerDisplay.style.display = 'block';
        } else if (this.currentPlayerDisplay) {
            this.currentPlayerDisplay.style.display = 'none';
        }

        // Atualizar número da pergunta
        if (this.questionNumberEl) {
            this.questionNumberEl.textContent = `Pergunta ${perguntaAtual + 1} de ${totalPerguntas}`;
        }

        // Atualizar texto da pergunta com animação
        if (this.questionTextEl) {
            this.questionTextEl.textContent = pergunta.pergunta;
            this.questionTextEl.style.animation = 'none';
            setTimeout(() => {
                this.questionTextEl.style.animation = 'fadeIn 0.3s ease-out';
            }, 10);
        }

        // Atualizar alternativas
        this.alternativesEls.forEach((btn, index) => {
            const altText = btn.querySelector('.alt-text') as HTMLElement;
            if (altText) {
                altText.textContent = `: ${pergunta.alternativas[index]}`;
            }

            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
            btn.style.pointerEvents = 'auto';
        });
    }

    /**
     * Mostra a tela de jogo
     */
    show(): void {
        if (this.container) {
            this.container.style.display = 'flex';
        }
    }

    /**
     * Oculta a tela de jogo
     */
    hide(): void {
        if (this.container) {
            this.container.style.display = 'none';
        }
    }
}

