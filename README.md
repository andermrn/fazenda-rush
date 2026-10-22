# 🌾 Fazenda Rush

**Fazenda Rush** é um jogo 2D de plataforma e combate desenvolvido como projeto acadêmico para o componente curricular **Programação Visual e Autoria Web**, utilizando apenas tecnologias web nativas.

O jogador escolhe um dos cinco personagens e atravessa **três fases**, enfrentando inimigos comuns e um **chefe** em cada uma delas, até chegar à vitória.

> **Versão:** 1.0.0 — versão final.

---

## Sobre o jogo

Cada fase tem seu próprio cenário, layout de plataformas, inimigos e chefe. Ao derrotar todos os alvos da fase, um portal aparece e leva o jogador à fase seguinte. Ao concluir a terceira fase, a tela de vitória é exibida. Se as três vidas acabarem, aparece a tela de Game Over.

| Fase | Inimigos comuns | Chefe |
| --- | --- | --- |
| 1 | 3 bodes | **Bodão** |
| 2 | 3 abelhas | **Abelha Rainha** |
| 3 | 3 peixes | **Carpa** |

---

## Funcionalidades

### Menu e telas

* Página única (`index.html`) com menu, seleção de personagens, jogo, Game Over e vitória, alternando telas via DOM.
* Menu com **Jogar** e **Sair**, vídeo de fundo em loop e música.
* Seleção de **cinco personagens**, cada um com sprite próprio, animado no cartão e usado no jogo.
* Botão para **mutar/desmutar** a música (menu e jogo).
* Música própria do menu e trilha sonora durante o jogo, com troca automática ao entrar e sair da partida.
* Tela de **Game Over** com imagem de fundo e tela de **vitória** com retorno automático à seleção.

### Jogador

* Movimentação com **A** e **D**.
* Pulo com **Espaço** ou **W**.
* Disparo de projéteis com o **clique do mouse** ou a tecla **Enter**.
* Gravidade, limites nas bordas do Canvas e colisão com plataformas.
* **3 vidas** com 1,5 s de invulnerabilidade após dano (efeito de piscar).
* Animações por spritesheet: parado, andando, pulo e tiro.

### Inimigos e chefes

* **Bode:** patrulha sobre uma plataforma, persegue e ataca de perto.
* **Abelha:** inimigo aéreo com movimento variado e perseguição.
* **Peixe:** patrulha sobre plataforma, com pulos aleatórios e perseguição.
* **Bodão:** alterna entre patrulha, preparo, investida (*dash*) e descanso.
* **Abelha Rainha:** persegue o jogador em 2D e ferroa ao se aproximar.
* **Carpa:** patrulha no chão e, ao detectar o jogador acima, salta na vertical.

### HUD

* Indicador de vidas por imagem (corações).
* Pontuação.
* Contador de inimigos restantes.

### Cenário e arquitetura

* Três cenários, com layouts de plataformas diferentes por fase (3, 4 e 3 plataformas).
* Dois portais animados, que aparecem apenas depois que a fase é limpa.
* Canvas responsivo: altura fixa de 900 px e largura proporcional à janela.
* Loop principal com `requestAnimationFrame`.
* Código organizado em `js/entidades/`, `js/sistemas/` e `js/telas/`.

---

## Controles

| Tecla / Ação | Resultado |
| --- | --- |
| **A** | Move para a esquerda |
| **D** | Move para a direita |
| **Espaço** ou **W** | Pula (no chão ou sobre plataforma) |
| **Clique esquerdo** ou **Enter** | Dispara um projétil na direção em que o jogador olha |
| **Qualquer tecla** (Game Over) | Volta à seleção de personagens, após 2 s |
| Botão 🔇 (canto superior esquerdo) | Muta/desmuta a música |

---

## Tecnologias utilizadas

* **HTML5** — estrutura da página.
* **CSS3** — estilização das telas e do HUD.
* **JavaScript** — lógica e comportamento do jogo.
* **Canvas API** — renderização dos elementos gráficos.
* **Spritesheets** — animações de personagens, inimigos, chefes e portais.
* **Git e GitHub** — versionamento e colaboração.
* **GitHub Actions** — workflow que notifica um canal do Discord a cada push na branch `develop`.

O projeto utiliza JavaScript puro, sem frameworks ou bibliotecas externas.

---

## Equipe de desenvolvimento

Projeto desenvolvido colaborativamente por estudantes do curso de Tecnologia em Análise e Desenvolvimento de Sistemas (TADS), com divisão de responsabilidades entre interface, lógica do jogo, personagens, inimigos e recursos gráficos.

**Integrantes:**

* Pedro Vinicius
* Joabe Gabriel
* Joaquim Vinicius
* Davi Silva
* Joanderson Moreno

---

## Contexto acadêmico

Projeto desenvolvido para fins acadêmicos em 2026, com o objetivo de aplicar conhecimentos de programação, desenvolvimento web, lógica de jogos, animação gráfica, organização de código, controle de versão e trabalho em equipe.