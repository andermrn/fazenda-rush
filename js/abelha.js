// ANIMAÇÃO
const imagemAbelha = new Image();
imagemAbelha.src = "assets/sprites/fase2/abelha.png";

const larguraFrameAbelha = 160;
const alturaFrameAbelha = 160;

const colunasAbelha = 4;
const intervaloFrameAbelha = 8;

// Criei essa constante para poder configurar aqui pelo código o tamanho da sprite 
const escala = 1.5; // (1 = Tamanho Default) !!!!!


class Abelha {

    constructor() {
        this.x = 600;
        this.y = 200;

        this.velocidade = 2;
        
        this.direcaoX = 1;
        this.direcaoY = 1;
        
        this.altura = 60 * escala;
        this.largura = 60 * escala;

        //ANIMAÇÃO
        this.frameX = 0;
        this.frameY = 1; // Começa na direita (Esquerda = 0; Direita = 1)
        this.gameFrame = 0;
    }

    mover() {
        if (this.x + this.largura >= canvas.width) {
            this.direcaoX = -1;
        }
        if (this.x <= 0) {
            this.direcaoX = 1;
        }
        if (this.y <= 440) {
            this.direcaoY = 1;
        }
        if (this.y + this.altura >= canvas.height - 40) {
            this.direcaoY = -1;
        }
        this.x += this.velocidade * this.direcaoX;
        this.y += this.velocidade * this.direcaoY;
    }

    draw() {

        if( this.direcaoX === -1 ) {
            this.frameY = 0; // Voando para Esquerda
        } else this.frameY = 1; // Voando para Direita

        // Só desenha se a imagem já terminou de carregar!!!!!!!!!!!!
        if (imagemAbelha.complete && imagemAbelha.naturalWidth > 0) {
            ctx.drawImage(
                imagemAbelha,                       // diretório
                this.frameX * larguraFrameAbelha,   // onde começa o recorte (horizontal)
                this.frameY * alturaFrameAbelha,    // onde começa o recorte (vertical)
                larguraFrameAbelha,                 // largura do recorte (160)
                alturaFrameAbelha,                  // altura do recorte (160)
                this.x,                             // onde desenhar no canvas (horizontal)
                this.y,                             // onde desenhar no canvas (vertical)
                this.largura,                       // largura final na tela
                this.altura                         // altura final na tela
            );
        }

        if ( this.gameFrame % intervaloFrameAbelha === 0 ) {
            this.frameX += 1;

            if( this.frameX >= colunasAbelha ) this.frameX = 0;
        }

        this.gameFrame++;

    }

}
const abelha1 = new Abelha();