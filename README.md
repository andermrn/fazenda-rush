# 🌾 Fazenda Rush

**Fazenda Rush** é um jogo 2D de plataforma desenvolvido como projeto acadêmico para o componente curricular **Programação Visual e Autoria Web**, utilizando apenas tecnologias web nativas.

O jogo reúne menu interativo, seleção de personagens, movimentação com física, combate por projéteis, dois tipos de inimigos, plataformas e um portal de troca de fase.

> **Versão:** 0.5.0 — em desenvolvimento.

---

## Sobre o jogo

O jogador controla um personagem em um cenário de fazenda, enfrentando inimigos, desviando de ataques e atravessando um portal para mudar de fase. O projeto é construído em JavaScript puro, com a lógica separada em módulos para jogador, inimigos, combate, plataformas, portal e menu.

---

## Funcionalidades

### Menu e navegação

* Página única (`index.html`) que reúne **menu**, **seleção de personagens** e **jogo**, com alternância de telas via DOM.
* Menu inicial com as opções **Jogar** e **Sair**.
* Vídeo de fundo em loop no menu.
* Música de fundo no menu, com botão para **mutar/desmutar**.
* Tela de seleção com cinco personagens (clique, destaque e botão **Confirmar**), além do botão **Voltar**.
* Sprites animados nos cartões de seleção.

### Jogador

* Movimentação com as teclas **A** e **D**.
* Pulo com a tecla **Espaço**.
* Gravidade e limitação de movimento nas bordas do Canvas.
* Colisão com plataformas (o jogador pousa sobre elas ao descer).
* Disparo de projéteis com o **clique do mouse**, com animação de tiro.
* Sistema de **3 vidas**, com 1,5 s de invulnerabilidade após receber dano (efeito de piscar).
* Animações por spritesheet (parado, esquerda, direita, pulo e tiro).
* Reinício da partida ao perder todas as vidas.

### Inimigos

* **Cavalo:** patrulha, perseguição ao jogador e ataque de coice, com animação própria. Fica sempre no chão e possui 10 pontos de vida.
* **Abelha:** inimigo aéreo com patrulha em 2D e perseguição ao jogador (velocidade aumenta ao perseguir). Possui 10 pontos de vida.
* Ambos causam dano ao jogador por contato e morrem ao ter a vida zerada.

### Cenário e fases

* Três plataformas com sprite e colisão.
* Portal animado no canto inferior direito.
* Duas fases (cenários de fundo diferentes), alternadas ao tocar no portal.
* Canvas responsivo: altura fixa e largura proporcional à janela.

### Loop do jogo

* Atualização, limpeza e redesenho contínuos do Canvas com `requestAnimationFrame`.

---

## Controles

| Tecla / Ação | Resultado |
| --- | --- |
| **A** | Move para a esquerda |
| **D** | Move para a direita |
| **Espaço** | Pula (no chão ou sobre plataforma) |
| **Clique esquerdo do mouse** | Dispara um projétil na direção em que o jogador olha |
| Botão 🔇 (canto superior esquerdo) | Muta/desmuta a música do menu |

---

## Tecnologias utilizadas

* **HTML5** — estrutura da página.
* **CSS3** — estilização das telas.
* **JavaScript** — lógica e comportamento do jogo.
* **Canvas** — renderização dos elementos gráficos.
* **Spritesheets** — animações de personagens, inimigos e portal.
* **Git e GitHub** — versionamento e colaboração.
* **GitHub Actions** — workflow que notifica um canal do Discord a cada push na branch `develop`.

O projeto utiliza JavaScript puro, sem frameworks ou bibliotecas externas.

---

## 🎯 Estado atual do projeto

| Funcionalidade | Estado |
| --- | --- |
| Menu inicial, vídeo de fundo e música | Implementado |
| Botão de mutar música | Implementado |
| Integração seleção ↔ jogo (página única) | Implementada |
| Seleção de personagens (clique, destaque, confirmar) | Implementada |
| Personagem escolhido alterar o sprite no jogo | Pendente |
| Sprites distintos para os cinco personagens | Pendente |
| Movimentação, pulo, gravidade e bordas | Implementados |
| Colisão com plataformas | Implementada |
| Disparo de projéteis com o mouse | Implementado |
| Sistema de vidas e invulnerabilidade | Implementado |
| Inimigo Cavalo | Implementado |
| Inimigo Abelha | Implementado |
| Portal e troca de cenário | Implementados |
| Animação de pulo | Parcial (bug conhecido) |
| HUD (vidas, pontuação, tempo) | Pendente |
| Tela de Game Over | Pendente |
| Condição de vitória | Pendente |
| Pontuação e coletáveis | Pendente |
| Trilha sonora e efeitos sonoros durante o jogo | Pendente |
| Tela de pausa | Pendente |
| Controles para dispositivos móveis | Pendente |
| Câmera com scroll | Pendente |

---

## Equipe de desenvolvimento

Projeto desenvolvido colaborativamente por estudantes do curso de Tecnologia em Análise e Desenvolvimento de Sistemas (TADS), com divisão de responsabilidades entre interface, lógica do jogo, personagens, inimigos e recursos gráficos.

**Integrantes:**

* Pedro Vinicius
* Joabe Gabriel
* Joaquim Vinicius
* Davi Silva
* Joanderson Moreno