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

        // Controle da mudança aleatória de direção.
this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();
this.contadorDirecao = 0;
        
        this.altura = 60 * escala;
        this.largura = 60 * escala;

        //ANIMAÇÃO
        this.frameX = 0;
        this.frameY = 1; // Começa na direita (Esquerda = 0; Direita = 1)
        this.gameFrame = 0;

        this.vida = 10;
        this.morta = false;
    }
// Sorteia um intervalo entre 60 e 180 quadros.
gerarIntervaloDirecao() {
    return Math.floor(Math.random() * 121) + 60;
}

    reiniciar() {
    this.x = 600;
    this.y = 200;

    this.velocidade = 2;

    this.direcaoX = 1;
    this.direcaoY = 1;

    this.frameX = 0;
    this.frameY = 1;
    this.gameFrame = 0;

    this.vida = 10;
    this.morta = false;
}
    
    
mover() {
    if (this.morta) return;

    const diferencaX = jogador.posicaoX - this.x; // Indica se o jogador está à direita ou à esquerda da abelha
    const diferencaY = jogador.posicaoY - this.y; // Indica se está acima ou abaixo

    const distancia = Math.sqrt(
        Math.pow(diferencaX, 2) + Math.pow(diferencaY, 2)
    ); // Calcula a distância entre a abelha e o jogador

    // COLISÃO
    if (
        this.x + this.largura >= jogador.posicaoX - 10 &&
        jogador.posicaoX + jogador.width + 10 >= this.x &&
        jogador.posicaoY + jogador.height >= this.y &&
        this.y + this.altura >= jogador.posicaoY
    ) {
        //jogador.receberDano();
        //ele para
    } else {
        // PERSEGUIÇÃO
        if (distancia <= 600 && jogador.height + jogador.posicaoY >= 470) {
            this.velocidade = 3; // Ela persegue mais rápido que na patrulha

            // Define a direção horizontal para seguir o jogador.
            if (diferencaX < -30) {
                this.direcaoX = -1;
            } else if (diferencaX > 30) {
                this.direcaoX = 1;
            } else {
                this.direcaoX = 0;
            }

            // Define a direção vertical para seguir o jogador.
            if (diferencaY < -10) {
                this.direcaoY = -1;
            } else if (diferencaY > 10) {
                this.direcaoY = 1;
            } else {
                this.direcaoY = 0;
            }

            // Respeita os limites verticais durante a perseguição.
            if (this.y + this.altura >= canvas.height - 10) {
                this.direcaoY = -1;
            }

            if (this.y <= 400) {
                this.direcaoY = 1;
            }

            // Não acumula o contador aleatório durante a perseguição.
            this.contadorDirecao = 0;

        } else {
            // PATRULHA
            this.velocidade = 2;

            // Muda de direção aleatoriamente durante a patrulha.
            this.contadorDirecao++;

            if (this.contadorDirecao >= this.intervaloMudancaDirecao) {
                this.direcaoX = Math.random() < 0.5 ? -1 : 1;
                this.direcaoY = Math.random() < 0.5 ? -1 : 1;

                this.contadorDirecao = 0;
                this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();
            }

            // Limites horizontais do canvas.
            if (this.x + this.largura >= canvas.width) {
                this.direcaoX = -1;
            }

            if (this.x <= 0) {
                this.direcaoX = 1;
            }

            // Limites verticais da patrulha.
            if (this.y <= 440) {
                this.direcaoY = 1;
            }

            if (this.y + this.altura >= canvas.height - 40) {
                this.direcaoY = -1;
            }
        }

        // Atualiza a posição da abelha.
        this.x += this.velocidade * this.direcaoX;
        this.y += this.velocidade * this.direcaoY;
    }
}


    draw() {
        if (this.morta) return;
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