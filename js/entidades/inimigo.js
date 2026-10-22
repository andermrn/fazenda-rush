const imagemInimigo = new Image();
imagemInimigo.src = "assets/sprites/fase1/inimigo.png";

// Aqui é a largura de cada sprite no .png: 640x512
const larguraFrameInimigo = 640;
const alturaFrameInimigo = 512;

// Numero de colunas por linha (os calculos vou trabalhar em cima dela)
const colunasInimigo = 6;
const intervaloFrameInimigo = 6; // intervalo para deixar a animação mais lenta, tipo: a cada 5 chamadas de draw(), troca a coluna



//atributos do inimigo
class Inimigo {
    constructor(plataforma) {
        this.plataforma = plataforma;

        // Nasce em uma posição aleatória dentro da plataforma
        this.x = plataforma.x + Math.random() *
            (plataforma.largura - this.largura);

        // Fica apoiado sobre a plataforma
        this.y = plataforma.y - this.altura;
    }

    // A posição inicial agora é definida pelo construtor

    // Alterei para 125x100 agora para a adição dos sprites!
    largura = 125;
    altura = 100;

    velocidade = 3;
    direcao = 1;
    proximaMudanca = Date.now() + 2000 + Math.random() * 3000;// define quando o inimigo deve mudar de direção pela primeira vez

    // Parte da Animação Joabão! Não alterei nenhuma lógica aqui do seu script!
    frameX = 0;       // coluna do quadro atual, como são 6 colunas, vai de 0 a 5
    frameY = 1;       // linha do quadro atual (0 = ta andando pra esquerda, 1 = ta andando pra direita)
    gameFrame = 0;    // apenas um contador que uso para controlar a velocidade da animação
    atacando = false;   // true = parado perto do jogador (vai ficar dando coice)

    vida = 10;
    morto = false;

    // DRAW() ANTIGO: APENAS UM QUADRADO, VOU CRIAR OUTRO DRAW() MAS AGORA COM O SPRITE!!!!
    // // desenha o inimigo no canvas
    // draw(){
    //     ctx.fillStyle = "green";//define a cor do retangulo
    //     ctx.fillRect(this.x,this.y,this.largura,this.altura);//desenha o retangulo
    // }

    draw() {
        if (this.morto) return;
        if (this.atacando === true) {
            // Atacando: usa as linhas do coice
            if (this.direcao === -1) {
                this.frameY = 2;   // coice para a esquerda (LINHA 3)
            } else {
                this.frameY = 3;   // coice para a direita (LINHA 4)
            }

        } else { // Caso ele não esteja atacando
            // Aqui é simples, se o inimig tiver indo para esquerda (direcao == -1), a linha vai ser a 0
            // Se estiver indo pra direita (direcao == 1), a linha vai ser a 1
            if (this.direcao === -1) {
                this.frameY = 0;
            } else this.frameY = 1;
        }


        // So desenha se a imageme ja terminou de carregar (Script de Vini7)
        if (imagemInimigo.complete && imagemInimigo.naturalWidth > 0) {
            ctx.drawImage(
                imagemInimigo,                      // .png do Inimigo
                this.frameX * larguraFrameInimigo,  // onde começa o recorte (na horizontal)
                this.frameY * alturaFrameInimigo,   // onde começa o recorte (na vertical)
                larguraFrameInimigo,                       // largura do recorte do sprite (512)
                alturaFrameInimigo,                        // altura do recorte do sprite (512)
                this.x,                             // x = onde desenha no canvas na posicao x
                this.y,                             // y = onde desenha no canvas na posicao y (vertical)
                this.largura,                       // largura final na tela
                this.altura                         // altura final na tela
            );
        }


        // Aqui ele faz aquela conta: espera passar 5 frames (intervaloFrameInimigo) do draw() para ai sim trocar para o proximo sprite
        // Vini criou isso aqui pra deixar a animação não muito rapida
        if ((this.gameFrame % intervaloFrameInimigo) === 0) {
            this.frameX += 1; // Aqui adiciona +1, ou seja, vai pra proxima coluna da linha

            if (this.frameX >= colunasInimigo) this.frameX = 0; // Ai se frameX for igual a 6, ele reinicia pra 0!!
        }

        this.gameFrame += 1; // aqui é aquele contador de frames do draw() que eu criei. 

    }



    //atualiza a posição e controla a direção do inimigo

    atualizar() {
        if (this.morto) return;

        this.atacando = false;

        // Calcula a distância horizontal entre o inimigo e o jogador
        let distancia;
        const distanciaEsquerda =
            jogador.posicaoX - (this.x + this.largura);//100 - 30 + 50 = distancia de 20 px
        const distanciaDireita =
            this.x - (jogador.posicaoX + jogador.width);

        if (this.x + this.largura < jogador.posicaoX) {
            distancia = distanciaEsquerda;
        } else if (this.x > jogador.posicaoX + jogador.width) {
            distancia = distanciaDireita;
        } else {
            distancia = 0;
        }

        // Limites que o inimigo pode alcançar na plataforma
        const limiteEsquerdo = this.plataforma.x;
        const limiteDireito =
            this.plataforma.x + this.plataforma.largura - this.largura;

        const mesmaAltura =
            jogador.posicaoY < this.y + this.altura &&
            jogador.posicaoY + jogador.height > this.y;

        // Perseguição
        if (distancia <= 150 && mesmaAltura) {
            const passo = Math.min(this.velocidade, distancia);

            if (this.x < jogador.posicaoX) {
                this.direcao = 1;
            } else {
                this.direcao = -1;
            }

            if (distancia > 0) {
                if (
                    this.direcao === 1 &&
                    this.x + this.largura < jogador.posicaoX
                ) {
                    this.x = Math.min(limiteDireito, this.x + passo);
                } else if (
                    this.direcao === -1 &&
                    this.x > jogador.posicaoX + jogador.width
                ) {
                    this.x = Math.max(limiteEsquerdo, this.x - passo);
                }
            } else {
                this.atacando = true;
            }
        } else {
            // Patrulha com mudança aleatória de direção
            if (Date.now() >= this.proximaMudanca) {
                // Sorteia uma nova direção para o inimigo.
                if (Math.random() < 0.5) {
                    this.direcao = -1; // Vai para a esquerda.
                } else {
                    this.direcao = 1; // Vai para a direita.
                }

                // Define a próxima mudança de direção entre 2 e 5 segundos.
                this.proximaMudanca =
                    Date.now() + 2000 + Math.random() * 3000;
            }

            if (this.x <= limiteEsquerdo) {
                this.direcao = 1;
            } else if (this.x >= limiteDireito) {
                this.direcao = -1;
            }

            this.x += this.velocidade * this.direcao;
        }

        // Mantém o inimigo na altura da plataforma
        this.y = this.plataforma.y - this.altura;
    }

    reiniciar() {
        this.x = this.plataforma.x;
        this.y = this.plataforma.y - this.altura;
        this.vida = 10;
        this.morto = false;
        this.atacando = false;
        this.direcao = 1;
        this.frameX = 0;
        this.frameY = 0;
    }
}