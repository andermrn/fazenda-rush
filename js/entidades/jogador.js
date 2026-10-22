let andandoesquerda = false;
let andandodireita = false;

const GRAVIDADE = 0.8;//*padrao 0.8
const VIDA_INFINITA = false;

// Imagem que carrega os sprites 
const imagemJogador = new Image();

const spritesPersonagens = {//o spritesPersonagens pode ser qualquer um desses, vai ser definido pela função
    Ander: "assets/sprites/personagens/joanderson.png",
    Joabe: "assets/sprites/personagens/joabe.png",
    Vinicius: "assets/sprites/personagens/vinicius.png",
    Davi: "assets/sprites/personagens/davi.png",
    Joaquim: "assets/sprites/personagens/joaquim.png"
};

function trocarPersonagem(nome) {
    const caminho = spritesPersonagens[nome];//sprites personagens é definido pelo nome escolhido, um dos de spritepersonagem
    //e o caminho é recebe esse valor

    if (!caminho) {//se caminho não existir
        console.error("Personagem não encontrado:", nome);
        return;
    }

    imagemJogador.src = caminho;//então imagemjogador recebe o arquivo daquele Personagem
}

const larguraFrameJogador = 256;// largura de cada frame
const alturaFrameJogador = 256;// altura de cada frame
const intervaloFrameJogador = 10;// intervalo pra deixar a animação mais lenta


class Player {
    width = 20;//largura do player, hitbox,
    height = 20;//altura do player, hitbox

    posicaoX = 100;//posiçâo x inicial do player
    posicaoY = 400;//posição y inicial do player

    velocidadeX = 0;//velocidade x inicial
    velocidadeY = 0;//velocidade y inicial

    forcadopulo = -22;
    estanochao = true;
    velocidadeandar = 6;

    frameX = 0;// coluna do quadro atual
    frameY = 0;// linha do quadro atual
    gameFrame = 0;// controla o intervalo entre os quadros da animação

    direcao = 1;//direcao pra onde o personagem olha
    tiro = false;

    // Sistema de vidas
    vidas = 3;
    invulneravel = false;
    tempoInvulnerabilidade = 1500;

    draw() {
        //animações de tiro
         if (this.tiro === true && this.direcao === 1) {
            this.frameY = 5;
        } else if (this.tiro === true && this.direcao === -1) {
            this.frameY = 6;
            //animações verticais paradas
        } else if ((this.velocidadeY < 0 || this.velocidadeY > 0) && (this.velocidadeX == 0) && (this.direcao == 1)) {
            this.frameY = 9;
        } else if ((this.velocidadeY < 0 || this.velocidadeY > 0) && (this.velocidadeX == 0) && (this.direcao == -1)) {
            this.frameY = 10;
            // Animações horizontais
        } else if (this.velocidadeX < 0) {
            this.frameY = 2;//velocidade negativa, ou seja o personagem vai para esquerda, entãoa acessa a linha 2 dos sprites que é o personagem indo pra esquerda
        } else if (this.velocidadeX > 0) {
            this.frameY = 1;//velocidade positiva, ou seja o personagem vai para direita, então acessa a linha 1 dos sprites que é o personagem indo pra direita
        } else if (this.velocidadeX === 0) {
            this.frameY = 0;//velocidade igual a zero então, acessa a linha 0 que é o personagem parado

            //animações verticais laterais
        } else if (this.velocidadeY < 0 && this.velocidadeX > 0) {
            this.frameY = 3;
        } else if (this.velocidadeY > 0 && this.velocidadeX > 0) {
            this.frameY = 3;
        } else if (this.velocidadeY < 0 && this.velocidadeX < 0) {
            this.frameY = 4;
        } else if (this.velocidadeY > 0 && this.velocidadeX < 0) {
            this.frameY = 4;
        }

        // Desenha o sprite depois da imagem carregar corretamente
        if (imagemJogador.complete && imagemJogador.naturalWidth > 0) {
            const larguraDesenho = 150;// define a largura do personagem na tela
            const alturaDesenho = 150;// define a altura do personagem na tela
            const ajustevisual = 12;//o sprite do personagem abaixo dele tem um espaço em branco, isso faz com que ele pareça flutuar nas plataformas
            //logo defino um valor que vai fazer ele ficar mais embaixo, somando no posicaodesenhoy
            

            const posicaoDesenhoX =
                this.posicaoX + (this.width - larguraDesenho) / 2;// Centraliza o sprite dentro da largura da colisão do jogador
            
            const posicaoDesenhoY =
                this.posicaoY + this.height - alturaDesenho + ajustevisual;// Alinha a base do sprite com a base do jogador; Y cresce de cima para baixo no canvas

            // Guarda o contexto antes de espelhar, para não afetar o cenário, tambem serve pra a opacidade da invulnerabilidade
            ctx.save();

            if (this.invulneravel) {//se a invulnerabilidade for true
                if (Math.floor(Date.now() / 100) % 2 === 0) {;//math.floor é uma função q arredonda pra baixo, pra um valor inteiro
                     ctx.globalAlpha = 0.3;//global alpha age como a opacidade
                } else {
                    ctx.globalAlpha = 1;
                }
            }

            // Espelha o personagem parado quando está virado para a esquerda
            if (this.frameY === 0 && this.direcao === -1) {
                ctx.translate(2 * posicaoDesenhoX + larguraDesenho, 0);//feito pra inverter sem mudar de lugar
                ctx.scale(-1, 1);//-1 inverte o eixo x, 1 não faz nada em y
            }

            ctx.drawImage(
                imagemJogador, // imagem que contém os frames do personagem
                this.frameX * larguraFrameJogador, // posição horizontal do frame na imagem
                this.frameY * alturaFrameJogador, // posição vertical do frame na imagem
                larguraFrameJogador, // largura do recorte do frame na imagem original
                alturaFrameJogador, // altura do recorte do frame na imagem original
                posicaoDesenhoX, // coordenada X onde o sprite começa a ser desenhado no canvas
                posicaoDesenhoY, // coordenada Y onde o sprite começa a ser desenhado no canvas
                larguraDesenho, // largura final do personagem na tela
                alturaDesenho // altura final do personagem na tela
            );

            // Restaura o contexto para os próximos desenhos não ficarem espelhados nem com a opacidade alterada.
            ctx.restore();

            // Controle da animação para ficar em animação estatica ao queda longa
            if (this.frameX === 4 && this.frameY === 3) {
                this.frameX = 4;
                this.frameY = 3;
            } else if (this.frameX === 4 && this.frameY === 4) {
                this.frameX = 4;
                this.frameY = 4;
            } else {
                if (this.gameFrame % intervaloFrameJogador === 0) {//a cada 10, ira dar 0, e um frame ira rodar
                    if(this.frameX<5){
                            this.frameX++;
                    }else{
                            this.frameX = 0;
                        } }

                this.gameFrame++;
            }
        }
    }

    update() {//função pra definir todos os valores corretamente
        this.velocidadeX = 0;

        if (andandodireita) {
            this.velocidadeX += this.velocidadeandar;//velocidade horizontal recebe velocidade de andar
        }

        if (andandoesquerda) {
            this.velocidadeX -= this.velocidadeandar;//velocidade horizontal recebe velocidade de andar negativa
        }

        this.posicaoX += this.velocidadeX;//posicaox = posicaox + velocidadex

        this.posicaoX = Math.max(0, Math.min(this.posicaoX, canvas.width - this.width));//limita pra não sair da tela

        // Guarda a posição vertical anterior
        const yAnterior = this.posicaoY;

        // Aplica gravidade
        this.velocidadeY += GRAVIDADE;
        this.posicaoY += this.velocidadeY;

        this.estanochao = false;
        //y - this.height = topo
        //y + this.height = base


        // Verifica colisões com as plataformas
        if (this.velocidadeY >= 0) {
            for (const plataformaAtual of plataformasDaFase()) {
                const estavaAcima = yAnterior + this.height <= plataformaAtual.y;//como o y cresce pra baixo, pra cima diminui, ou seja, quanto menor o y, mais alto
                //o yAnterior + this.height vai calcular a altura da base do jogador, se ela for menor que a altura da plataforma atual, ou seja, mais alta, estavaAcima = true

                const passouPeloTopo =
                    this.posicaoY + this.height >= plataformaAtual.y;//passoupelotopo é true se a base do jogador tiver abaixo ou na altura da plataforma

                const sobrepoeNaHorizontal =//define o limite horizontal da plataforma, verifica se o jogador da dentro dos limites horizontais
                    this.posicaoX > plataformaAtual.x &&
                    this.posicaoX < plataformaAtual.x + plataformaAtual.largura;

                if (estavaAcima && passouPeloTopo && sobrepoeNaHorizontal) {
                    // Alinha a base do jogador exatamente ao topo da plataforma para
                    // que ele não fique parcialmente dentro dela.
                    this.posicaoY = plataformaAtual.y - this.height;
                    this.velocidadeY = 0;//velocidade agora é 0, pois ele esta na plataforma
                    this.estanochao = true;//como esta na plataforma pode pular novamente
                    break;
                }

            }
        }

        // Colisão com a base do canvas
        if (this.posicaoY + this.height >= canvas.height) {
            this.posicaoY = canvas.height - this.height;
            this.velocidadeY = 0;
            this.estanochao = true;
        }
    }

    // Recebe dano e ativa a invulnerabilidade temporária
    receberDano() {
        if (this.invulneravel || this.vidas <= 0) {//se o jogador estiver ivulneravel ou sem nenhuma vida, return pra não aplicar dano novamente
            return;
        }

        if (VIDA_INFINITA === false) this.vidas--;//se nao tiver vida infinita, receba dano
        this.invulneravel = true;//fica ivulneravel por um periodo depois de receber dano

        console.log(`Vidas restantes: ${this.vidas}`);

        setTimeout(() => {//agenda uma ação, nessa função primeiro você bota a ação que sera feita
            //e depois o tempo de espera pra ela ser feita
            this.invulneravel = false;//ação q sera feita
        }, this.tempoInvulnerabilidade);//tempo de espera
    }

    pular() {
        if (this.estanochao) {//se esta no chao for true, velocidadey recebe forcadopulo e estanochao fica false
            this.frameX = 0;//reinicia animações pra evitar bugs
            this.velocidadeY = this.forcadopulo;
            this.estanochao = false;
        }
    }
    reiniciar() { // Reinicia os atributos do jogador para iniciar uma nova partida.
        this.vidas = 3;
        this.invulneravel = false;

        this.posicaoX = 100;
        this.posicaoY = 400;

        this.velocidadeX = 0;
        this.velocidadeY = 0;

        this.direcao = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;

        this.tiro = false;
        this.estanochao = false;

        andandoesquerda = false;
        andandodireita = false;
    }
}


const jogador = new Player();//instanciação de objeto

// Controles do teclado
window.addEventListener("keydown", (e) => {//ao pressionar espaço pular
    if (e.code === "Space") {
        jogador.pular();
    }
    
    if(e.code === "KeyW"){
        jogador.pular();
    }

    // KeyD = PEGA TANTO d QUANTO D
    if (e.code === "KeyD") {//ao pressionar d andar direita
        andandodireita = true;
        jogador.direcao = 1;
    }

    // KeyA = PEGA TANTO a QUANTO A
    if (e.code === "KeyA") {//ao pressionar a andar esquerda
        andandoesquerda = true;
        jogador.direcao = -1;
    }
});

window.addEventListener("keyup", (e) => {//ao soltar d parar andar direita
    if (e.code === "KeyD") {
        andandodireita = false;
    }

    if (e.code === "KeyA") {//ao soltar a parar andar esquerda
        andandoesquerda = false;
    }

});

// Controles do disparo
window.addEventListener("mousedown", (e) => {//ao clicar no mouse fazer:

    // Isso aqui evita o jogador conseguir atirar na tela inicial
    if (jogoRodando === false) {
        return;
    }

    jogador.tiro = true;
    atirar();
});

window.addEventListener("mouseup", (e) => {//ao soltar o mouse fazer:
    jogador.tiro = false;
});

window.addEventListener("keydown", (e) => {
   
    if (jogoRodando === false) {
        return;
    }

    if (e.code === "Enter") {
        jogador.tiro = true;
        atirar();
    }

});

window.addEventListener("keyup", (e) => {
   
    if (e.code === "Enter") {
        jogador.tiro = false;
    }

});