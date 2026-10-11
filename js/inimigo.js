const imagemInimigo = new Image();
imagemInimigo.src = "assets/sprites/fase1/inimigo.png"; 

// Aqui é a largura de cada sprite no .png: 512x512
const larguraFrameInimigo = 512;
const alturaFrameInimigo = 512;

// Numero de colunas por linha (os calculos vou trabalhar em cima dela)
const colunasInimigo = 6; 
const intervaloFrameInimigo = 10; // intervalo para deixar a animação mais lenta, tipo: a cada 5 chamadas de draw(), troca a coluna




class Inimigo {
    //atributos do inimigo
    x = 300;//posição horizontal
    y = 500;//posição vertical

    // Alterei para 100 agora para a adição dos sprites!
    largura = 100;
    altura = 100;

    velocidade = 3;
    direcao = 1;

    // Parte da Animação Joabão! Não alterei nenhuma lógica aqui do seu script!
    frameX = 0;       // coluna do quadro atual, como são 6 colunas, vai de 0 a 5
    frameY = 1;       // linha do quadro atual (0 = ta andando pra esquerda, 1 = ta andando pra direita)
    gameFrame = 0;    // apenas um contador que uso para controlar a velocidade da animação



    // DRAW() ANTIGO: APENAS UM QUADRADO, VOU CRIAR OUTRO DRAW() MAS AGORA COM O SPRITE!!!!
    // // desenha o inimigo no canvas
    // draw(){
    //     ctx.fillStyle = "green";//define a cor do retangulo
    //     ctx.fillRect(this.x,this.y,this.largura,this.altura);//desenha o retangulo
    // }

    draw() {

        // Aqui é simples, se o inimig tiver indo para esquerda (direcao == -1), a linha vai ser a 0
        // Se estiver indo pra direita (direcao == 1), a linha vai ser a 1
        if( this.direcao === -1 ) {
            this.frameY = 0;
        } else this.frameY = 1;

        // So desenha se a imageme ja terminou de carregar (Script de Vini7)
        if( imagemInimigo.complete && imagemInimigo.naturalWidth > 0 ) {
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
        if( (this.gameFrame % intervaloFrameInimigo) === 0 ) {
            this.frameX += 1; // Aqui adiciona +1, ou seja, vai pra proxima coluna da linha

            if( this.frameX >= colunasInimigo ) this.frameX = 0; // Ai se frameX for igual a 6, ele reinicia pra 0!!
        }

        this.gameFrame += 1; // aqui é aquele contador de frames do draw() que eu criei. 

    }



    //atualiza a posição e controla a direção do inimigo
    atualizar() { //faz se mover, patrulhar e perseguir
        let distancia;//diz qual a distancia entra as bordas do inimigo e do jogador
        let distanciaEsquerda = jogador.posicaoX - (this.x + this.largura);// calcula a distãncia entre a borda direita do inimigo e a borda esquerda do jogador
        let distanciaDireita = this.x - (jogador.posicaoX + jogador.width);// calcula os limites da borda direita do jogador e a borda esquerda do inimigo
        if (this.x + this.largura < jogador.posicaoX) {// verifica se o inimigo está a esquerda do jogador
            distancia = distanciaEsquerda;
        } else if (this.x > jogador.posicaoX + jogador.width) {// verfica se o inimigo está a direita do jogador
            distancia = distanciaDireita;
        } else {
            distancia = 0//inimigo está encostando ou sobrepondo o jogador
        }
        //perseguição
        if (distancia <= 150) { //se a distancia entre o inimigo e o personagem for de até 150 pixels ele persegue
            console.log("Jogador detectado!!!");
            if (this.x < jogador.posicaoX) {//define a direcao que o inimigo deve perseguir
                this.direcao = 1;
            } else {
                this.direcao = -1
            }
            if (this.direcao == 1 && this.x + this.largura < jogador.posicaoX) { //move o inimigo até enconstar no jogador
                this.x += this.velocidade * this.direcao;
            } if (this.direcao == -1 && this.x > jogador.posicaoX + jogador.width) {
                this.x += this.velocidade * this.direcao;
            }

        } else {
            //caso o inimigo esteja a mais de 150 pixels de distancia do jogador, o inimigo continua patrulhando
            if (this.x + this.largura >= canvas.width) {
                this.direcao = -1;
            }
            // inverte a direção ao atingir o limite esquerdo
            if (this.x <= 0) {
                this.direcao = 1;
            }
            this.x += this.velocidade * this.direcao;
        }
        // faz ele sempre estar no "chão"
        this.y = canvas.height - this.altura;
        //impede que o inimigo ultrapasse os limites x do canvas
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.largura));
    }
}
//cria um objeto da classe inimigo
let inimigo = new Inimigo();