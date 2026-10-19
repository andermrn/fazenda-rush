const imagemPortal = new Image();
imagemPortal.src = "assets/cenarios/portal.png";

// Tamanho de cada sprite no .png: 128x192
const larguraFramePortal = 128;
const alturaFramePortal = 192;

const colunasPortal = 5;
const intervaloFramePortal = 10;   // a cada 8 chamadas de draw(), troca a coluna

// Escala do portal: 1 = tamanho original do desenho (128x192)
const escalaPortal = 1.2;

class Portal {

    constructor() {
        this.largura = larguraFramePortal * escalaPortal;
        this.altura = alturaFramePortal * escalaPortal;

        this.x = 0;
        this.y = 0;

        // Animação
        this.frameX = 0;       // coluna do quadro atual (0 a 4)
        this.gameFrame = 0;    // contador para controlar a velocidade do girinho
    }

    atualizar() {
        this.x = canvas.width - this.largura;
        this.y = canvas.height - this.altura;
    }

    // DRAW TEMPORÁRIO: só um retângulo para ver a posição (vamos trocar no Passo 3)
    draw() {
        // Só desenha se a imagem já terminou de carregar
        if ( imagemPortal.complete && imagemPortal.naturalWidth > 0 ) {
            ctx.drawImage(
                imagemPortal,                      
                this.frameX * larguraFramePortal,   // onde começa o recorte (horizontal)
                0,                                  // onde começa o recorte (vertical): sempre 0, só tem uma linha
                larguraFramePortal,                 
                alturaFramePortal,                  
                this.x,                             
                this.y,                             
                this.largura,                       
                this.altura                       
            );
        }

        if ( this.gameFrame % intervaloFramePortal === 0 ) {
            this.frameX += 1;

            if ( this.frameX >= colunasPortal ) {
                this.frameX = 0;
            }
        }

        this.gameFrame++;
    }

    colisaoJogador() {
        
        let esquerdaJogador = jogador.posicaoX;
        let direitaJogador = jogador.posicaoX + jogador.width;
        let topoJogador = jogador.posicaoY;
        let baseJogador = jogador.posicaoY + jogador.height;

        let esquerdaPortal = this.x;
        let direitaPortal = this.x + this.largura;
        let topoPortal = this.y;
        let basePortal = this.y + this.altura;

        if( direitaJogador > esquerdaPortal && esquerdaJogador < direitaPortal && baseJogador > topoPortal && topoJogador < basePortal ) {
            return true;
        } else return false;

    }

}