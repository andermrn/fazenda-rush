let andandoesquerda = false;
let andandodireita = false;

const GRAVIDADE = 0.8;//*padrao 0.8
let VIDA_INFINITA = false;

// Carrega os sprites usados para animar o jogador
const imagemJogador = new Image();

const spritesPersonagens = {
    Ander: "assets/sprites/personagens/joanderson.png",
    Joabe: "assets/sprites/personagens/joabe.png",
    Vinicius: "assets/sprites/personagens/vinicius.png",
    Davi: "assets/sprites/personagens/davi.png",
    Joaquim: "assets/sprites/personagens/joaquim.png"
};

function trocarPersonagem(nome) {
    const caminho = spritesPersonagens[nome];

    if (!caminho) {
        console.error("Personagem não encontrado:", nome);
        return;
    }

    imagemJogador.src = caminho;
}

const larguraFrameJogador = 256;// largura de cada frame
const alturaFrameJogador = 256;// altura de cada frame
const colunasJogador = 6;// quantidade de frames em cada linha 
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
    frameY = 0;// coluna do quadro atual
    gameFrame = 0;// controla o intervalo entre os quadros da animação

    direcao = 1;
    tiro = false;

    // Sistema de vidas
    vidas = 3;
    invulneravel = false;
    tempoInvulnerabilidade = 1500;

    draw() {
        // Animações horizontais
        if (this.tiro === true && this.direcao === 1) {
            this.frameY = 5;
        } else if (this.tiro === true && this.direcao === -1) {
            this.frameY = 6;
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
            //animações verticais paradas
        } if ((this.velocidadeY < 0 || this.velocidadeY > 0) && (this.velocidadeX == 0) && (this.direcao == 1)) {
            this.frameY = 9;
        } else if ((this.velocidadeY < 0 || this.velocidadeY > 0) && (this.velocidadeX == 0) && (this.direcao == -1)) {
            this.frameY = 10;
        }

        // Desenha o sprite depois da imagem carregar corretamente
        if (imagemJogador.complete && imagemJogador.naturalWidth > 0) {
            const larguraDesenho = 150;// define a largura do personagem na tela
            const alturaDesenho = 150;// define a altura do personagem na tela
            const ajustevisual = 12;//o sprite do personagem abaixo dele tem um espaço em branco, isso faz com que ele pareça flutuar nas plataformas
            //logo defino um valor que vai fazer ele ficar mais embaixo, somando no posicaodesenhoy
            // Centraliza o sprite dentro da largura usada para colisão do jogado

            const posicaoDesenhoX =
                this.posicaoX + (this.width - larguraDesenho) / 2;

            const posicaoDesenhoY =
                this.posicaoY + this.height - alturaDesenho + ajustevisual;// Alinha a base do sprite com a base do jogador; Y cresce de cima para baixo no canvas

            // Guarda o contexto antes de espelhar, para não afetar o cenário.
            ctx.save();

            // Pisca durante a invulnerabilidade
            if (this.invulneravel) {
                ctx.globalAlpha = Math.floor(Date.now() / 100) % 2 === 0
                    ? 0.3
                    : 1;
            }

            // Espelha o personagem parado quando está virado para a esquerda
            if (this.frameY === 0 && this.direcao === -1) {
                ctx.translate(2 * posicaoDesenhoX + larguraDesenho, 0);
                ctx.scale(-1, 1);
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

            // Restaura o contexto para os próximos desenhos não ficarem espelhados.
            ctx.restore();

            // Controle da animação
            if (this.frameX === 4 && this.frameY === 3) {
                this.frameX = 4;
                this.frameY = 3;
            } else if (this.frameX === 4 && this.frameY === 4) {
                this.frameX = 4;
                this.frameY = 4;
            } else {
                if (this.gameFrame % intervaloFrameJogador === 0) {//a cada 10, ira dar 0, e um frame ira rodar
                    this.frameX = (this.frameX + 1) % colunasJogador;
                }

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

        this.posicaoX = Math.max(0, Math.min(this.posicaoX, canvas.width - this.width));//*preciso entender ainda

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
        if (this.invulneravel || this.vidas <= 0) {
            return;
        }

        if (VIDA_INFINITA === false) this.vidas--;
        this.invulneravel = true;

        console.log(`Vidas restantes: ${this.vidas}`);

        setTimeout(() => {
            this.invulneravel = false;
        }, this.tempoInvulnerabilidade);
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
        e.preventDefault();
        jogador.pular();
    }

    if (e.key === "Enter") {//ao pressionar d andar direita
        e.preventDefault();
        jogador.tiro = true;
        atirar();
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
    if (e.key === "Enter") {//ao pressionar d andar direita
        e.preventDefault();
        jogador.tiro = false;
    }
});


// Controles do disparo
window.addEventListener("mousedown", (e) => {//ao clicar no mouse fazer:

    // Isso aqui evita o jogador conseguir atirar na tela inicial (DAVI)
    if (jogoRodando === false) {
        return;
    }

    e.preventDefault();
    jogador.tiro = true;
    atirar();
});

window.addEventListener("mouseup", (e) => {//ao soltar o mouse fazer:
    e.preventDefault();
    jogador.tiro = false;
});