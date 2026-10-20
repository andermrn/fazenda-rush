const ctx = canvas.getContext("2d");

let andandoesquerda = false;
let andandodireita = false;

const GRAVIDADE = 0.8;

// Carrega os sprites usados para animar o jogador
const imagemJogador = new Image();

const spritesPersonagens = {
    Ander: "assets/sprites/personagens/davi.png",
    Joabe: "assets/sprites/personagens/joabe.png",
    Vinicius: "assets/sprites/personagens/vinicius.png",
    Davi: "assets/sprites/personagens/davi.png",
    Joaquim: "assets/sprites/personagens/joaquim.png"
};

function trocarPersonagem(nome) {
    const caminho = spritesPersonagens[nome];

    if (!caminho) {
        console.error("Personagem não encontrado:", nome);
        return;
    }

    imagemJogador.src = caminho;
}

const larguraFrame = 256;
const alturaFrame = 256;
const framesPorAnimacao = 6;
const intervaloFrame = 10;

const vida_infinita = true;

class Player {
    width = 20;
    height = 20;

    posicaoX = 100;
    posicaoY = 400;

    velocidadeX = 0;
    velocidadeY = 0;

    forcadopulo = -22;
    estanochao = true;
    velocidadeandar = 6;

    frameX = 0;
    frameY = 0;
    gameFrame = 0;

    direcao = 1;
    tiro = false;

    // Sistema de vidas
    vidas = 3;
    invulneravel = false;
    tempoInvulnerabilidade = 1500;

    draw() {
        // Animações horizontais
        if (this.tiro === true && this.direcao === 1) {
            this.frameY = 5;
        } else if (this.tiro === true && this.direcao === -1) {
            this.frameY = 6;
        } else if (this.velocidadeX < 0) {
            this.frameY = 2;
        } else if (this.velocidadeX > 0) {
            this.frameY = 1;
        } else if (this.velocidadeX === 0) {
            this.frameY = 0;
        } else if (this.velocidadeY < 0 && this.velocidadeX > 0) {
            this.frameY = 3;
        } else if (this.velocidadeY > 0 && this.velocidadeX > 0) {
            this.frameY = 3;
        } else if (this.velocidadeY < 0 && this.velocidadeX < 0) {
            this.frameY = 4;
        } else if (this.velocidadeY > 0 && this.velocidadeX < 0) {
            this.frameY = 4;
        } else if (
            this.velocidadeY < 0 ||
            (this.velocidadeY > 0 && this.velocidadeX === 0)
        ) {
            this.frameY = 9;
        }

        if (imagemJogador.complete && imagemJogador.naturalWidth > 0) {
            const larguraDesenho = 150;
            const alturaDesenho = 150;
            const ajustevisual = 12;

            const posicaoDesenhoX =
                this.posicaoX + (this.width - larguraDesenho) / 2;

            const posicaoDesenhoY =
                this.posicaoY + this.height - alturaDesenho + ajustevisual;

            ctx.save();

            // Pisca durante a invulnerabilidade
            if (this.invulneravel) {
                ctx.globalAlpha = Math.floor(Date.now() / 100) % 2 === 0
                    ? 0.3
                    : 1;
            }

            // Espelha o personagem parado quando está virado para a esquerda
            if (this.frameY === 0 && this.direcao === -1) {
                ctx.translate(2 * posicaoDesenhoX + larguraDesenho, 0);
                ctx.scale(-1, 1);
            }

            ctx.drawImage(
                imagemJogador,
                this.frameX * larguraFrame,
                this.frameY * alturaFrame,
                larguraFrame,
                alturaFrame,
                posicaoDesenhoX,
                posicaoDesenhoY,
                larguraDesenho,
                alturaDesenho
            );

            ctx.restore();

            // Controle da animação
            if (this.frameX === 4 && this.frameY === 3) {
                this.frameX = 4;
                this.frameY = 3;
            } else if (this.frameX === 4 && this.frameY === 4) {
                this.frameX = 4;
                this.frameY = 4;
            } else {
                if (this.gameFrame % intervaloFrame === 0) {
                    this.frameX = (this.frameX + 1) % framesPorAnimacao;
                }

                this.gameFrame++;
            }
        }
    }

    update() {
        this.velocidadeX = 0;

        if (andandodireita) {
            this.velocidadeX += this.velocidadeandar;
        }

        if (andandoesquerda) {
            this.velocidadeX -= this.velocidadeandar;
        }

        this.posicaoX += this.velocidadeX;

        this.posicaoX = Math.max(
            0,
            Math.min(this.posicaoX, canvas.width - this.width)
        );

        // Guarda a posição vertical anterior
        const yAnterior = this.posicaoY;

        // Aplica gravidade
        this.velocidadeY += GRAVIDADE;
        this.posicaoY += this.velocidadeY;

        this.estanochao = false;

        // Verifica colisões com as plataformas
        if (this.velocidadeY >= 0) {
            for (const plataformaAtual of plataformas) {
                const estavaAcima =
                    yAnterior + this.height <= plataformaAtual.y;

                const passouPeloTopo =
                    this.posicaoY + this.height >= plataformaAtual.y;

                const sobrepoeNaHorizontal =
                    this.posicaoX > plataformaAtual.x &&
                    this.posicaoX < plataformaAtual.x + plataformaAtual.largura;

                if (
                    estavaAcima &&
                    passouPeloTopo &&
                    sobrepoeNaHorizontal
                ) {
                    this.posicaoY = plataformaAtual.y - this.height;
                    this.velocidadeY = 0;
                    this.estanochao = true;
                    break;
                }
            }
        }

        // Colisão com a base do canvas
        if (this.posicaoY + this.height >= canvas.height) {
            this.posicaoY = canvas.height - this.height;
            this.velocidadeY = 0;
            this.estanochao = true;
        }
    }

    // Recebe dano e ativa a invulnerabilidade temporária
    receberDano() {
    if (this.invulneravel || this.vidas <= 0) {
        return;
    }

    if( vida_infinita === false ) this.vidas--;
    this.invulneravel = true;

    console.log(`Vidas restantes: ${this.vidas}`);

    if (this.vidas <= 0) {
        this.morto = true;
    }

    setTimeout(() => {
        this.invulneravel = false;
    }, this.tempoInvulnerabilidade);
}

    pular() {
        if (this.estanochao) {
            this.frameX = 0;
            this.velocidadeY = this.forcadopulo;
            this.estanochao = false;
        }
    }
    reiniciar() { // Reinicia os atributos do jogador para iniciar uma nova partida.
        this.vidas = 3;
        this.invulneravel = false;
    
        this.posicaoX = 100;
        this.posicaoY = 400;
    
        this.velocidadeX = 0;
        this.velocidadeY = 0;
    
        this.direcao = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
    
        this.tiro = false;
        this.estanochao = false;
    
        andandoesquerda = false;
        andandodireita = false;
    }
}


const jogador = new Player();

// Controles do teclado
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        jogador.pular();
    }

    if (e.key === "d") {
        andandodireita = true;
        jogador.direcao = 1;
    }

    if (e.key === "a") {
        andandoesquerda = true;
        jogador.direcao = -1;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key === "d") {
        andandodireita = false;
    }

    if (e.key === "a") {
        andandoesquerda = false;
    }
});

// Controles do disparo
window.addEventListener("mousedown", (e) => {
    e.preventDefault();
    jogador.tiro = true;
    atirar();
});

window.addEventListener("mouseup", (e) => {
    e.preventDefault();
    jogador.tiro = false;
});