# 🌾 Fazenda Rush

<<<<<<< HEAD
**Fazenda Rush** é um jogo 2D desenvolvido como projeto acadêmico para o componente curricular **Programação Visual e Autoria Web**.

O projeto tem como objetivo aplicar conceitos de desenvolvimento web por meio da criação de um jogo interativo.

## Sobre o jogo

O jogo está em desenvolvimento e contará com movimentação de personagem, cenários com plataformas, inimigos e mecânicas de combate.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript

O projeto será desenvolvido sem bibliotecas externas, utilizando os recursos nativos dessas tecnologias.

## Equipe de desenvolvimento

Projeto desenvolvido em equipe por estudantes do curso de Tecnologia em Análise e Desenvolvimento de Sistemas (TADS).

## Status do projeto

**Em desenvolvimento.**

## Objetivo acadêmico

Aplicar conhecimentos de programação, desenvolvimento web, lógica de jogos, organização de código, controle de versão e trabalho em equipe.

---

Desenvolvido para fins acadêmicos em 2026.
=======
**Fazenda Rush** é um jogo 2D desenvolvido como projeto acadêmico, utilizando tecnologias web. O projeto reúne movimentação de personagens, animações com spritesheets, comportamento de inimigos e um menu interativo para proporcionar a base de uma experiência de jogo no estilo plataforma.

O desenvolvimento utiliza HTML, CSS e JavaScript.

> **Versão:** 1.0.0 — versão inicial do projeto.

---

## Sobre o jogo

O objetivo do projeto é desenvolver um jogo 2D com mecânicas de movimentação, animação e interação com inimigos, além de uma interface para navegação e seleção de personagens.

A estrutura foi organizada em módulos JavaScript para separar as responsabilidades do jogador, dos inimigos e do loop principal do jogo.

## Funcionalidades implementadas

### Menu e seleção de personagens

* Menu inicial com as opções **Jogar** e **Sair**.
* Tela de seleção com cinco personagens disponíveis. (Não finalizado.)
* Música de fundo no menu.

### Jogador

* Movimentação por meio do teclado.
* Controles de movimento com as teclas **A** e **D**.
* Pulo com a tecla **Espaço**.
* Física básica com gravidade.
* Limitação de movimentação nas bordas.
* Animações com spritesheet para os estados de personagem parado, movimentação para a direita e movimentação para a esquerda.
* Ajuste responsivo do Canvas à janela.

### Inimigos

* Movimentação e animação por spritesheet.
* Comportamento de patrulha.
* Perseguição ao jogador.

### Loop do jogo

* Atualização contínua dos elementos.
* Limpeza e redesenho do Canvas.
* Atualização e renderização do jogador e do inimigo.
* Uso de `requestAnimationFrame` para executar o loop do jogo.

---

## Tecnologias utilizadas

* **HTML5** — estrutura das páginas.
* **CSS3** — estilização da interface.
* **JavaScript** — lógica e comportamento do jogo.
* **Canvas API** — renderização dos elementos gráficos.
* **Spritesheets** — animações dos personagens.
* **Git e GitHub** — versionamento e colaboração.

O projeto utiliza JavaScript puro, sem frameworks ou bibliotecas externas para a lógica principal do jogo.

---

## 📁 Estrutura do projeto

A organização geral dos arquivos está descrita abaixo. Os caminhos exatos dos recursos podem variar conforme a estrutura atual do repositório.

```text
fazenda-rush/
├── .vscode/
│   └── settings.json
├── assets/
│   ├── audio/
│   ├── cenarios/
│   └── sprites/
│       ├── fase1/
│       └── personagens/
├── css/
│   └── style.css
├── js/
│   ├── inimigo.js
│   ├── jogador.js
│   ├── jogo.js
│   └── menu.js
├── index.html
├── menu.html
└── README.md
```

### Responsabilidade dos arquivos

| Arquivo      | Responsabilidade                                    |
| ------------ | --------------------------------------------------- |
| `index.html` | Página principal do jogo e elemento Canvas.         |
| `menu.html`  | Interface do menu e seleção de personagens.         |
| `jogador.js` | Física, movimentação e animação do jogador.         |
| `inimigo.js` | Movimento, animação e comportamento dos inimigos.   |
| `jogo.js`    | Loop principal e atualização dos elementos do jogo. |
| `menu.js`    | Navegação entre as telas do menu.                   |
| `style.css`  | Estilização da interface.                           |
| `assets/`    | Recursos de áudio, sprites e cenário.               |

---

##  Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/andermrn/fazenda-rush.git
```

### 2. Acesse a pasta do projeto

```bash
cd fazenda-rush
```

### 3. Abra o projeto

Abra a pasta no Visual Studio Code.

Você pode executar as páginas HTML diretamente no navegador ou utilizar uma extensão de servidor local, como o Live Server, caso seja necessário para carregar os recursos do jogo.

**Observação:** o projeto possui páginas separadas para o menu e para o jogo. A integração entre a tela de seleção e o Canvas principal ainda está pendente, conforme o estado atual do desenvolvimento. Por isso, as duas experiências podem precisar ser executadas separadamente.

---

## 🎯 Estado atual do projeto

| Funcionalidade                                     | Estado        |
| -------------------------------------------------- | ------------- |
| Menu inicial                                       | Implementado  |
| Seleção de cinco personagens                       | Pendente      |
| Música de fundo do menu                            | Implementada  |
| Canvas responsivo                                  | Implementado  |
| Movimentação e física básica do jogador            | Implementadas |
| Controles de teclado                               | Implementados |
| Animações do jogador                               | Implementadas |
| Animações dos inimigos                             | Implementadas |
| Patrulha e perseguição dos inimigos                | Implementadas |
| Loop principal com `requestAnimationFrame`         | Implementado  |
| Integração da tela de seleção com o jogo principal | Pendente      |

---

## Equipe de desenvolvimento

Projeto desenvolvido colaborativamente por estudantes do curso de Análise e Desenvolvimento de Sistemas, com divisão de responsabilidades entre interface, lógica do jogo, personagens, inimigos e recursos gráficos.

**Integrantes:**

* [Pedro Vinicius 1]
* [Joabe Gabriel 2]
* [Joaquim Vinicius 3]
* [David de Souaz 4]
* [Joanderson Moreno 5]

---

## Contexto acadêmico

Projeto desenvolvido no contexto acadêmico, com o objetivo de aplicar conhecimentos de desenvolvimento web, lógica de programação, animação gráfica e trabalho colaborativo com controle de versão.


>>>>>>> develop
