# Efeitos Sonoros

## Arquivos Necessários

Coloque os seguintes arquivos de áudio nesta pasta:

- `click.mp3` - Som de clique em botão (≤ 2s)
- `correct.mp3` - Som de resposta correta (≤ 2s)
- `wrong.mp3` - Som de resposta errada (≤ 2s)
- `timer-warning.mp3` - Aviso de timer (≤ 2s, sutil)
- `level-complete.mp3` - Conclusão de nível (≤ 2s)
- `game-start.mp3` - Início de jogo (≤ 2s)
- `game-over.mp3` - Fim de jogo (≤ 2s)

## Especificações Técnicas

- **Formato:** MP3 (ou WAV/OGG se necessário)
- **Duração:** Máximo 2 segundos cada
- **Volume:** Normalizado (evitar volumes muito altos)
- **Qualidade:** 44.1kHz, 128kbps ou superior
- **Características:** Sons limpos, não agressivos, profissionais

## Sugestões de Fontes

- [Freesound.org](https://freesound.org)
- [Zapsplat](https://www.zapsplat.com)
- [Mixkit](https://mixkit.co/free-sound-effects/)

## Notas

- Os arquivos devem estar nesta pasta (`/frontend/public/sounds/`)
- O AudioService tentará carregar automaticamente na inicialização
- Se algum arquivo não for encontrado, o jogo continuará funcionando normalmente

