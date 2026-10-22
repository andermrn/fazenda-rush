// ANIMAÇÃO
const imagemAbelha = new Image();
imagemAbelha.src = "assets/sprites/fase2/abelha.png";

const larguraFrameAbelha = 160;
const alturaFrameAbelha = 160;

const colunasAbelha = 4;
const intervaloFrameAbelha = 8;

// Criei essa constante para poder configurar aqui pelo código o tamanho da sprite 
const escalaAbelha = 1.5; // (1 = Tamanho Default) !!!!!


class Abelha {

    constructor(x, y) { //Coloquei esses atributos joabao pq as abelhas estao nascendo todas juntas

        // Guarda onde ela nasce, para o reiniciar() voltar para o mesmo lugar
        this.xInicial = x;
        this.yInicial = y;

        this.x = x;
        this.y = y;

        this.velocidade = 2;// velocidade que o inimigo se move


        this.direcaoX = 1;//direção que o inimigo se move horizontalmente
        this.direcaoY = 1;//direcao que o inimigo se mexe verticalmente

        // Controle da mudança aleatória de direção.
        this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();
        this.contadorDirecao = 0;

        this.altura = 60 * escalaAbelha;
        this.largura = 60 * escalaAbelha;

        //ANIMAÇÃO
        this.frameX = 0;
        this.frameY = 1; // Começa na direita (Esquerda = 0; Direita = 1)
        this.gameFrame = 0;

        this.vida = 10;
        this.morto = false;
    }
    // Sorteia um intervalo entre 60 e 180 quadros.
    gerarIntervaloDirecao() {
        return Math.floor(Math.random() * 121) + 60;
    }

    reiniciar() {
        this.x = this.xInicial;
        this.y = this.yInicial;

        this.velocidade = 2;

        this.direcaoX = 1;
        this.direcaoY = 1;

        this.contadorDirecao = 0;
        this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();

        this.frameX = 0;
        this.frameY = 1;
        this.gameFrame = 0;

        this.vida = 10;
        this.morto = false;
    }


    atualizar() {
        if (this.morto) return;

        const diferencaX = jogador.posicaoX - this.x; // Indica se o jogador está à direita ou à esquerda da abelha
        const diferencaY = jogador.posicaoY - this.y; // Indica se está acima ou abaixo

        const distancia = Math.sqrt(
            Math.pow(diferencaX, 2) + Math.pow(diferencaY, 2)//Math.pow faz DiferencaX e Y ao quadrado e depois Math.sqrt faz a raiz quadrada dando assim a distancia real
        ); // Calcula a distância entre a abelha e o jogador utilizando pitagoras

        // COLISÃO
        if (
            this.x + this.largura >= jogador.posicaoX - 10 &&
            jogador.posicaoX + jogador.width + 10 >= this.x &&
            jogador.posicaoY + jogador.height >= this.y &&
            this.y + this.altura >= jogador.posicaoY
        ) {
            jogador.receberDano();

        } else {
            // PERSEGUIÇÃO
            if (distancia <= 600 && jogador.height + jogador.posicaoY >= 470) {
                this.velocidade = 3; // Ela persegue mais rápido que na patrulha

                // Define a direção horizontal para seguir o jogador.
                if (diferencaX < -30) {
                    this.direcaoX = -1;// se o jogador tiver à esquerda ele vai pra esquerda
                } else if (diferencaX > 30) {
                    this.direcaoX = 1;// se o jogador tiver à direita ele vai pra direita
                } else {
                    this.direcaoX = 0;// se eles se sobrepoem ele nao se move
                }

                // Define a direção vertical para seguir o jogador.
                if (diferencaY < -10) {
                    this.direcaoY = -1;//se o jogador tiver a cima ele vai pra cima 
                } else if (diferencaY > 10) {
                    this.direcaoY = 1;// se tiver abaixo ele vai pra baixo
                } else {
                    this.direcaoY = 0;// se eles se sobrepoem ele nao se move               
                }

                // Respeita os limites verticais durante a perseguição.
                if (this.y + this.altura >= canvas.height - 10) {
                    this.direcaoY = -1;// se chega no chao do canvas ele sobe
                }

                if (this.y <= 400) {
                    this.direcaoY = 1;// se chegar na posição 400 do eixo Y ele desce (limite que dei para a abelha)
                }

                // Não acumula o contador aleatório durante a perseguição.
                this.contadorDirecao = 0;

            } else {
                // PATRULHA
                this.velocidade = 2;

                // Muda de direção aleatoriamente durante a patrulha.
                this.contadorDirecao++;

                if (this.contadorDirecao >= this.intervaloMudancaDirecao) {
                    if (Math.random() < 0.5) {
                        this.direcaoX = -1;// se cair um numero menor que 0.5 vai pra esquerda
                    } else {
                        this.direcaoX = 1;// se não vai pra direita
                    }

                    if (Math.random() < 0.5) {
                        this.direcaoY = -1;// aqui vai pra cima
                    } else {
                        this.direcaoY = 1;//aqui pra baixo
                    }

                    this.contadorDirecao = 0;
                    this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();
                }
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



draw() {
    if (this.morto) return;
    if (this.direcaoX === -1) {
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

    if (this.gameFrame % intervaloFrameAbelha === 0) {
        this.frameX += 1;

        if (this.frameX >= colunasAbelha) this.frameX = 0;
    }

    this.gameFrame++;

}
}