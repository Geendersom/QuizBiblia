// ============================================
// SERVIÇO DE ÁUDIO - GERENCIADOR CENTRAL
// ============================================

/**
 * AudioService - Centraliza todos os efeitos sonoros do jogo
 * 
 * Responsabilidades:
 * - Pré-carregar todos os sons
 * - Evitar sobreposição excessiva
 * - Controlar volume global
 * - Gerenciar estado de mute
 */

interface AudioCache {
    click: HTMLAudioElement;
    correct: HTMLAudioElement;
    wrong: HTMLAudioElement;
    timerWarning: HTMLAudioElement;
    levelComplete: HTMLAudioElement;
    gameStart: HTMLAudioElement;
    gameOver: HTMLAudioElement;
}

class AudioServiceClass {
    private audioCache: AudioCache | null = null;
    private isMuted: boolean = false;
    private volume: number = 0.4;
    private timerWarningPlayed: boolean = false; // Para tocar apenas 1 vez por pergunta
    private currentQuestionId: number = -1;

    /**
     * Inicializa o serviço de áudio, pré-carregando todos os sons
     */
    init(): void {
        try {
            // Tentar carregar preferência de mute do LocalStorage
            const savedMute = localStorage.getItem('quizbiblia_audio_muted');
            if (savedMute !== null) {
                this.isMuted = savedMute === 'true';
            }

            // Pré-carregar todos os arquivos de áudio
            // Caminhos relativos ao HTML (public/index.html)
            this.audioCache = {
                click: this.createAudio('./sounds/click.mp3'),
                correct: this.createAudio('./sounds/correct.mp3'),
                wrong: this.createAudio('./sounds/wrong.mp3'),
                timerWarning: this.createAudio('./sounds/timer-warning.mp3'),
                levelComplete: this.createAudio('./sounds/level-complete.mp3'),
                gameStart: this.createAudio('./sounds/game-start.mp3'),
                gameOver: this.createAudio('./sounds/game-over.mp3')
            };

            console.log('AudioService inicializado');
        } catch (error) {
            console.warn('Erro ao inicializar AudioService:', error);
            this.audioCache = null;
        }
    }

    /**
     * Cria um elemento Audio otimizado
     */
    private createAudio(src: string): HTMLAudioElement {
        const audio = new Audio(src);
        audio.volume = this.volume;
        audio.preload = 'auto';
        // Não permitir que o navegador baixe automaticamente (economia de dados)
        audio.load();
        return audio;
    }

    /**
     * Reproduz um som se não estiver mutado
     */
    private play(audio: HTMLAudioElement | undefined): void {
        if (this.isMuted || !audio) {
            return;
        }

        try {
            // Resetar o áudio para o início antes de tocar
            audio.currentTime = 0;
            audio.volume = this.volume;
            
            // Reproduzir sem aguardar (não bloqueia)
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Erro comum: usuário precisa interagir primeiro
                    // Silenciosamente ignora o erro
                    console.debug('Áudio não pode ser reproduzido:', error);
                });
            }
        } catch (error) {
            // Ignora erros silenciosamente para não quebrar o jogo
            console.debug('Erro ao reproduzir áudio:', error);
        }
    }

    /**
     * Reproduz som de clique em botão
     */
    playClick(): void {
        this.play(this.audioCache?.click);
    }

    /**
     * Reproduz som de resposta correta
     */
    playCorrect(): void {
        this.play(this.audioCache?.correct);
    }

    /**
     * Reproduz som de resposta errada
     */
    playWrong(): void {
        this.play(this.audioCache?.wrong);
    }

    /**
     * Reproduz aviso de timer (apenas 1 vez por pergunta)
     */
    playTimerWarning(questionId: number): void {
        // Se for uma nova pergunta, resetar o flag
        if (questionId !== this.currentQuestionId) {
            this.timerWarningPlayed = false;
            this.currentQuestionId = questionId;
        }

        // Tocar apenas se ainda não tocou nesta pergunta
        if (!this.timerWarningPlayed) {
            this.play(this.audioCache?.timerWarning);
            this.timerWarningPlayed = true;
        }
    }

    /**
     * Reproduz som de nível completo
     */
    playLevelComplete(): void {
        this.play(this.audioCache?.levelComplete);
    }

    /**
     * Reproduz som de início de jogo
     */
    playGameStart(): void {
        this.play(this.audioCache?.gameStart);
    }

    /**
     * Reproduz som de fim de jogo
     */
    playGameOver(): void {
        this.play(this.audioCache?.gameOver);
    }

    /**
     * Muta todos os sons
     */
    mute(): void {
        this.isMuted = true;
        this.saveMuteState();
    }

    /**
     * Desmuta todos os sons
     */
    unmute(): void {
        this.isMuted = false;
        this.saveMuteState();
    }

    /**
     * Alterna estado de mute
     */
    toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        this.saveMuteState();
        return this.isMuted;
    }

    /**
     * Retorna estado de mute
     */
    getIsMuted(): boolean {
        return this.isMuted;
    }

    /**
     * Define volume (0.0 a 1.0)
     */
    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.audioCache) {
            Object.values(this.audioCache).forEach(audio => {
                audio.volume = this.volume;
            });
        }
    }

    /**
     * Retorna volume atual
     */
    getVolume(): number {
        return this.volume;
    }

    /**
     * Salva estado de mute no LocalStorage
     */
    private saveMuteState(): void {
        try {
            localStorage.setItem('quizbiblia_audio_muted', this.isMuted.toString());
        } catch (error) {
            console.warn('Erro ao salvar estado de mute:', error);
        }
    }

    /**
     * Reseta o flag de timer warning (chamado ao iniciar nova pergunta)
     */
    resetTimerWarning(): void {
        this.timerWarningPlayed = false;
        this.currentQuestionId = -1;
    }
}

// Instância singleton
export const AudioService = new AudioServiceClass();

// Expor globalmente para uso em HTML
declare global {
    interface Window {
        AudioService: typeof AudioService;
    }
}

if (typeof window !== 'undefined') {
    window.AudioService = AudioService;
}

