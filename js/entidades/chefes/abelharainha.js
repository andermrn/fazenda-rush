const imagemRainha = new Image();
imagemRainha.src = "assets/sprites/fase2/abelharainha.png";

// 420 x 380
const larguraFrameRainha = 420;
const alturaFrameRainha = 380;

const colunasRainha = 4;
const intervaloFrameRainha = 9;  
const escalaRainha = 0.5;        // 1 = tamanho default (420 x 380)

// Distância em pixels da qual ela passa a atacar com a ferroada
// Seja oq deus quiser
const alcanceXRainha = 200;
const alcanceYRainha = 150;

class Rainha {
    constructor() {
        this.largura = larguraFrameRainha * escalaRainha;
        this.altura = alturaFrameRainha * escalaRainha;

        this.x = canvas.width - this.largura; // começa colada na borda
        this.y = 250;

        this.vida = 10;
        this.morto = false;

        this.velocidade = 4; // Velocidade em px

        // true = está perto do jogador e atacando com a ferroada
        this.atacando = false;

        // Animação (linha 0 = voa para a esquerda, linha 1 = voa para a direita)
        this.direcao = 1; 
        this.frameX = 0;
        this.frameY = 1;
        this.gameFrame = 0;
    }

    atualizar() {
        if (this.morto) return;

        // Centro da Rainha e centro do jogador
        const centroRainhaX = this.x + this.largura / 2;
        const centroRainhaY = this.y + this.altura / 2;
        const centroJogadorX = jogador.posicaoX + jogador.width / 2;
        const centroJogadorY = jogador.posicaoY + jogador.height / 2;

        // Quanto falta andar em cada eixo (negativo = esquerda/cima, positivo = direita/baixo)
        const diferencaX = centroJogadorX - centroRainhaX;
        const diferencaY = centroJogadorY - centroRainhaY;

        // Perto do jogador (nos dois eixos) ela ataca
        let perto = false;

        if (Math.abs(diferencaX) < alcanceXRainha && Math.abs(diferencaY) < alcanceYRainha) {
            perto = true;
        }

        // Começou ou parou de atacar agora: recomeça a animação do primeiro quadro
        if ( perto !== this.atacando ) {
            this.atacando = perto;
            this.frameX = 0;
            this.gameFrame = 0;
        }

        // Horizontal: anda e vira para o lado do jogador
        if (diferencaX < -10) {
            this.direcao = -1;
            this.x = this.x - this.velocidade;
        } else if (diferencaX > 10) {
            this.direcao = 1;
            this.x = this.x + this.velocidade;
        }

        // Vertical: sobe ou desce atrás do jogador
        if (diferencaY < -10) {
            this.y = this.y - this.velocidade;
        } else if (diferencaY > 10) {
            this.y = this.y + this.velocidade;
        }

        // Não deixa sair da tela
        if (this.x < 0) this.x = 0; // saindo pra esquerda
        if (this.x > canvas.width - this.largura) this.x = canvas.width - this.largura;  // saindo pra direita
        if (this.y < 0) this.y = 0; // saindo pra cima
        if (this.y > canvas.height - this.altura) this.y = canvas.height - this.altura; // saindo pra baixo
    }

    draw() {
        if (this.morto) return;

        // Escolhe a linha pelo estado e pela direção
        if ( this.atacando === true ) {
            if ( this.direcao === -1 ) {
                this.frameY = 2;   // ferroada para a esquerda
            } else this.frameY = 3;   // ferroada para a direita
        } else {
            if ( this.direcao === -1 ) {
                this.frameY = 0;   // voa para a esquerda
            } else this.frameY = 1;   // voa para a direita
        }

        // Só desenha depois que a imagem carregou
        if (imagemRainha.complete && imagemRainha.naturalWidth > 0) {
            ctx.drawImage(
                imagemRainha,
                this.frameX * larguraFrameRainha,   // recorte: x
                this.frameY * alturaFrameRainha,    // recorte: y
                larguraFrameRainha,                 // recorte: largura
                alturaFrameRainha,                  // recorte: altura
                this.x,                             // destino no canvas: x
                this.y,                             // destino no canvas: y
                this.largura,                       // tamanho final: largura
                this.altura                         // tamanho final: altura
            );
        }

        // Troca de quadro a cada "intervaloFrameRainha" chamadas
        if (this.gameFrame % intervaloFrameRainha === 0) {
            this.frameX += 1;

            if (this.frameX >= colunasRainha) this.frameX = 0;
        }

        this.gameFrame++;
    }

    reiniciar() {
        this.x = canvas.width - this.largura;
        this.y = 250;

        this.vida = 10;
        this.morto = false;
        this.atacando = false;

        this.direcao = 1;
        this.frameX = 0;
        this.gameFrame = 0;
    }
}