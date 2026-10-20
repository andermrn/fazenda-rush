const escalaPortal = 1.2;

class Portal {

    constructor(tipo, colunasPortal, imagemPortalSrc) {
        if( tipo == "abelha" ) {
            this.larguraFramePortal = 128;
            this.alturaFramePortal = 192;
            this.intervaloFrame = 12
            
            this.largura = this.larguraFramePortal * escalaPortal;
            this.altura = this.alturaFramePortal * escalaPortal;

        } else if( tipo == "peixe" ) {
            this.larguraFramePortal = 160;
            this.alturaFramePortal = 160;

            this.largura = this.larguraFramePortal * escalaPortal;
            this.altura = this.alturaFramePortal * escalaPortal;
            this.intervaloFrame = 5;
        }

        this.x = 0;
        this.y = 0;

        // Animação
        this.frameX = 0;       // coluna do quadro atual (0 a 4)
        this.gameFrame = 0;    // contador para controlar a velocidade do girinho
        this.colunasPortal = colunasPortal;

        this.image = new Image();
        this.image.src = imagemPortalSrc;

    }

    atualizar() {
        this.x = canvas.width - this.largura;
        this.y = canvas.height - this.altura;
    }

    draw() {
        // Só desenha se a imagem já terminou de carregar
        if ( this.image.complete && this.image.naturalWidth > 0 ) {
            ctx.drawImage(
                this.image,                      
                this.frameX * this.larguraFramePortal,   // onde começa o recorte (horizontal)
                0,                                  // onde começa o recorte (vertical): sempre 0, só tem uma linha
                this.larguraFramePortal,                 
                this.alturaFramePortal,                  
                this.x,                             
                this.y,                             
                this.largura,                       
                this.altura                       
            );
        }

        if ( this.gameFrame % this.intervaloFrame === 0 ) {
            this.frameX += 1;

            if ( this.frameX >= this.colunasPortal ) {
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