
class Peixe extends Abelha {
    constructor() {
        super();
 this.x = 600;//eixo X
        this.y = 200;//eixo Y

        this.velocidade = 2;// velocidade que o inimigo se move

        
        this.direcaoX = 1;//direção que o inimigo se move horizontalmente
        this.direcaoY = 1;//direcao que o inimigo se mexe verticalmente
        
        this.altura = 60 * escala;
        this.largura = 60 * escala;

    }

     mover() {
        const diferencaX = jogador.posicaoX - this.x;//indica se o jogador está à direita ou a esquerda da abelha
        const diferencaY = jogador.posicaoY - this.y;//indica se está acima ou abaixo
        const distancia = Math.sqrt( Math.pow(diferencaX,2) + Math.pow (diferencaY,2));// transforma as duas diferenças em uma unica distância(Math.pow eleva as diferenças ao quadrado) e (Math.sqrt calcula a raiz quadrada)
        //COLISÃO
     if(this.x + this.largura >= jogador.posicaoX - 10 && jogador.posicaoX + jogador.width + 10 >= this.x && jogador.posicaoY + jogador.height >= this.y && this.y + this.altura >= jogador.posicaoY){
        jogador.receberDano();
    //ele para
    } else {
        //PERSEGUIÇÃO
        if(distancia <= 600 && jogador.height + jogador.posicaoY >= 470){
            this.velocidade = 3; // ela persegue mais rapido que patrulha
            if ( diferencaX < -30 ){
                this.direcaoX = -1;//Verifica os limites do canva caso a abelha chege ela troca de direção
            } else if (diferencaX > 30){
                this.direcaoX = 1;
            }else {
                this.direcaoX = 0
            }
            if (diferencaY < -10 ){
                this.direcaoY = -1;
            } else if (diferencaY > 10){
                this.direcaoY = 1;
            } else {
                this.direcaoY = 0;
            }
            if(this.y + this.altura >= canvas.height - 10){
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
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

const peixe1 = new Peixe();
