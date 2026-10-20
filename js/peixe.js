const imagemPeixe = new Image();
imagemPeixe.src = "assets/sprites/fase3/inimigo.png";

// Tamanho de cada sprite: 96x96
const larguraFramePeixe = 96;
const alturaFramePeixe = 96;

// Número de colunas por linha
const colunasPeixe = 4;
const intervaloFramePeixe = 8;
const escalaPeixe = 1; // Escala do peixe: 1 = tamanho original do desenho (96x96)

class Peixe extends Abelha {
    constructor() {
        super();
        this.vida = 10;
        this.morta = false;
        this.x = 600;//eixo X
        this.y = 200;//eixo Y

        this.velocidade = 2;// velocidade que o inimigo se move


        this.direcaoX = 1;//direção que o inimigo se move horizontalmente
        this.direcaoY = 1;//direcao que o inimigo se mexe verticalmente

        this.altura = alturaFramePeixe * escalaPeixe;
        this.largura = larguraFramePeixe * escalaPeixe;

        // ANIMAÇÃO
        this.frameX = 0;      // coluna do quadro atual (0 a 3)
        this.frameY = 0;      // linha do quadro atual (0 = direita, 1 = esquerda)
        this.gameFrame = 0;   // contador para controlar a velocidade do nado

        this.atacando = false;         // true = encostou no jogador (vai morder)
        this.olhandoDireita = true;    // para qual lado o peixe está virado

    }

    mover() {
        if (this.morta) return; //peixe para quando morre
        this.atacando = false;

        const diferencaX = jogador.posicaoX - this.x;//indica se o jogador está à direita ou a esquerda da abelha
        const diferencaY = jogador.posicaoY - this.y;//indica se está acima ou abaixo
        const distancia = Math.sqrt(Math.pow(diferencaX, 2) + Math.pow(diferencaY, 2));// transforma as duas diferenças em uma unica distância(Math.pow eleva as diferenças ao quadrado) e (Math.sqrt calcula a raiz quadrada)
       
        //COLISÃO
        if (this.x + this.largura >= jogador.posicaoX - 10 && jogador.posicaoX + jogador.width + 10 >= this.x && jogador.posicaoY + jogador.height >= this.y && this.y + this.altura >= jogador.posicaoY) {
            jogador.receberDano();
            this.atacando = true;
            //ele para
        } else {
            //PERSEGUIÇÃO
            if (distancia <= 600 && jogador.height + jogador.posicaoY >= 470) {
                this.velocidade = 3; // ela persegue mais rapido que patrulha
                if (diferencaX < -30) {
                    this.direcaoX = -1;//Verifica os limites do canva caso a abelha chege ela troca de direção
                } else if (diferencaX > 30) {
                    this.direcaoX = 1;
                } else {
                    this.direcaoX = 0
                }
                if (diferencaY < -10) {
                    this.direcaoY = -1;
                } else if (diferencaY > 10) {
                    this.direcaoY = 1;
                } else {
                    this.direcaoY = 0;
                }
                if (this.y + this.altura >= canvas.height - 10) {
                    this.direcaoY = -1;
                }
                if (this.y <= 400) {
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

    // === [ DAVI ] === 
    draw() {
        // Peixe morto não é desenhado
        if (this.morta) return;

        // linha 0 = direita e linha 1 = esquerda
        if (this.direcaoX === -1) {
            this.olhandoDireita = false;
        } else if (this.direcaoX === 1) {
            this.olhandoDireita = true;
        }

        if( this.atacando === true ) {
            if( this.olhandoDireita === true ) {
                this.frameY = 2;
            } else this.frameY = 3;
        } else {
            if ( this.olhandoDireita === true ) {
                this.frameY = 0;   // nadando para a direita
            } else this.frameY = 1;   // nadando para a esquerda
        }

        if (imagemPeixe.complete && imagemPeixe.naturalWidth > 0) {
            ctx.drawImage(
                imagemPeixe,                       // a folha de sprites inteira
                this.frameX * larguraFramePeixe,   // onde começa o recorte (horizontal)
                this.frameY * alturaFramePeixe,    // onde começa o recorte (vertical)
                larguraFramePeixe,                 
                alturaFramePeixe,                  
                this.x,                            
                this.y,                           
                this.largura,                      
                this.altura                        
            );
        }
            
        // Troca de quadro a cada "intervaloFramePeixe" chamadas do draw()
        if (this.gameFrame % intervaloFramePeixe === 0) {
            this.frameX = this.frameX + 1;

            if (this.frameX >= colunasPeixe) {
                this.frameX = 0;
            }
        }

        this.gameFrame = this.gameFrame + 1;
    }
}

const peixe1 = new Peixe();
