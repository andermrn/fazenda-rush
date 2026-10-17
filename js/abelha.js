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

    constructor() {//Atributos
        this.x = 600;//eixo X
        this.y = 200;//eixo Y

        this.velocidade = 2;// velocidade que o inimigo se move

        
        this.direcaoX = 1;//direção que o inimigo se move horizontalmente
        this.direcaoY = 1;//direcao que o inimigo se mexe verticalmente
        
        this.altura = 60 * escala;
        this.largura = 60 * escala;

        //ANIMAÇÃO
        this.frameX = 0;
        this.frameY = 1; // Começa na direita (Esquerda = 0; Direita = 1)
        this.gameFrame = 0;
    }
    
    mover() {
        const diferencaX = jogador.posicaoX - this.x;//indica se o jogador está à direita ou a esquerda da abelha
        const diferencaY = jogador.posicaoY - this.y;//indica se está acima ou abaixo
        const distancia = Math.sqrt( Math.pow(diferencaX,2) + Math.pow (diferencaY,2));// transforma as duas diferenças em uma unica distância(Math.pow eleva as diferenças ao quadrado) e (Math.sqrt calcula a raiz quadrada)
        //COLISÃO
     if(this.x + this.largura >= jogador.posicaoX - 10 && jogador.posicaoX + jogador.width + 10 >= this.x && jogador.posicaoY + jogador.height >= this.y && this.y + this.altura >= jogador.posicaoY){
        console.log("COLIDIU");
    //ele para
    } else {
        //PERSEGUIÇÃO
        if(distancia <= 600 && jogador.height + jogador.posicaoY >= 440){
            this.velocidade = 4; // ela persegue mais rapido que patrulha
            if ( diferencaX < 0 ){
                this.direcaoX = -1;
            } else {
                this.direcaoX = 1;
            }
            if (diferencaY < 0 ){
                this.direcaoY = -1;
            } else {
                this.direcaoY = 1;
            }
            if(this.y + this.altura >= canvas.height - 40){
                this.direcaoY = -1;
            }
            if (this.y <= 400){
                this.direcaoY = 1;
            }
        } else {
            //PATRULHA
            this.velocidade = 2;
        if (this.x + this.largura >= canvas.width) {
            this.direcaoX = -1;  // se for maior que o limite do eixo horizontal do canvas (limite direito) ele fica com a negativa que faz se mover para esquerda
        }
        if (this.x <= 0) {
            this.direcaoX = 1; // se for menor que 0 (limite esquerdo) do canvas ele fica com a direcao horizontal positiva que faz mover para direita
        }
        if (this.y <= 440) {
            this.direcaoY = 1;// se o eixo y for menor que a posicao 440 a posicao fica positiva o que faz se mover para baixo
        }
        if (this.y + this.altura >= canvas.height - 40) {
            this.direcaoY = -1;// se o eixo Y for maior que a altura do canvas (limite inferior) - 40 a posicao fica negativa o que faz se mover para cima
        }
    }
        this.x += this.velocidade * this.direcaoX;// atualiza o eixo X
    this.y += this.velocidade * this.direcaoY;// atualiza o eixo Y
    }
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