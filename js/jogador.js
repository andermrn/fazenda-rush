//estudar linha 52, 90, 115, 136

const canvas = document.getElementById("canvas");

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

const ctx = canvas.getContext("2d");

let andandoesquerda = false;
let andandodireita = false;
const GRAVIDADE = 0.1;//*padrao 0.6

// Carrega os sprites usada pra animar o player
const imagemJogador = new Image();
imagemJogador.src = "assets/sprites/personagens/davi_pulo.png";
const larguraFrame = 256; // largura de cada frame
const alturaFrame = 256; // altura de cada frame
const framesPorAnimacao = 6; // quantidade de frames em cada linha 
const intervaloFrame = 10; // intervalo pra deixar a animação mais lenta, *padrao 5

class Player{ 
    width = 150;//largura do player
    height = 150;//altura do player
    posicaoX = 100;//posiçâo x inicial do player
    posicaoY = 700 - this.height;//posição y inicial do player
    velocidadeX = 0;//velocidade x inicial
    velocidadeY = 0;//velocidade y inicial
    forcadopulo = -10;//força do pulo, *padrao -20
    estanochao = true;//verificação se o personagem está no chão
    velocidadeandar = 6;//velocidade
    frameX = 0; // coluna do quadro atual
    frameY = 0; // linha do quadro atual
    gameFrame = 0; // controla o intervalo entre os quadros da animação

draw(){//função pra definir o frame exibido
    // Aplicação da linha conforme valores de velocidade

    //animações horizontais

    if (this.velocidadeX < 0) {
        this.frameY = 2;//velocidade negativa, ou seja o personagem vai para esquerda, entãoa acessa a linha 2 dos sprites que é o personagem indo pra esquerda
    } else if (this.velocidadeX > 0) {
        this.frameY = 1;//velocidade positiva, ou seja o personagem vai para direita, então acessa a linha 1 dos sprites que é o personagem indo pra direita
    } else if(this.velocidadeX == 0){
        this.frameY = 0;//velocidade igual a zero então, acessa a linha 0 que é o personagem parado
    }

    //animações verticais laterais
    if(this.velocidadeY < 0 &&this.velocidadeX > 0){
        this.frameY = 3;
    }else if(this.velocidadeY > 0 &&this.velocidadeX > 0){
        this.frameY = 3;
    }
    else if(this.velocidadeY < 0 && this.velocidadeX < 0){
        this.frameY = 4;
    } else if(this.velocidadeY > 0 &&this.velocidadeX < 0){
        this.frameY = 4;
    }else

    //animações verticais paradas
    if(this.velocidadeY < 0 || this.velocidadeY>0&&this.velocidadeX == 0){
        this.frameY = 9;
    }


    // Desenha o sprite depois da imagem carregar corretamente
    if (imagemJogador.complete && imagemJogador.naturalWidth > 0) {
        const larguraDesenho = 150; // define a largura do personagem na tela
        const alturaDesenho = 150; // define a altura do personagem na tela
        // Centraliza o sprite dentro da largura usada para colisão do jogador
        const posicaoDesenhoX = this.posicaoX + (this.width - larguraDesenho) / 2;
        // Alinha a base do sprite com a base do jogador; Y cresce de cima para baixo no canvas
        const posicaoDesenhoY = this.posicaoY + this.height - alturaDesenho;

        ctx.drawImage(
            imagemJogador, // imagem que contém os frames do personagem
            this.frameX * larguraFrame, // posição horizontal do frame na imagem
            this.frameY * alturaFrame, // posição vertical do frame na imagem
            larguraFrame, // largura do recorte do frame na imagem original
            alturaFrame, // altura do recorte do frame na imagem original
            posicaoDesenhoX, // coordenada X onde o sprite começa a ser desenhado no canvas
            posicaoDesenhoY, // coordenada Y onde o sprite começa a ser desenhado no canvas
            larguraDesenho, // largura final do personagem na tela
            alturaDesenho // altura final do personagem na tela
        );
    }

    // Avança um frame da animação a cada intervalo para controlar sua velocidade.

    if(this.frameX == 4 && this.frameY == 3){
        this.frameX = 4;
        this.frameY = 3;
    }else if(this.frameX == 4 && this.frameY == 4){
        this.frameX = 4;
        this.frameY = 4;
    }else{

    if (this.gameFrame % intervaloFrame === 0) {//a cada 5, ira dar 0, e um frame ira rodar
        this.frameX = (this.frameX + 1) % framesPorAnimacao;
    }
    this.gameFrame++;
}
}

update(){//função pra definir todos os valores corretamente

    this.velocidadeX = 0;
    if (andandodireita) {
        this.velocidadeX += this.velocidadeandar;//velocidade horizontal recebe velocidade de andar
    }
    if (andandoesquerda) {
        this.velocidadeX -= this.velocidadeandar;//velocidade horizontal recebe velocidade de andar negativa
    }
    this.posicaoX += this.velocidadeX;//posicaox = posicaox + velocidadex
    this.posicaoX = Math.max(0, Math.min(this.posicaoX, canvas.width - this.width));//*preciso entender ainda

    this.velocidadeY += GRAVIDADE;//velocidadey = velocidadey + gravidade
    this.posicaoY += this.velocidadeY;//posicaoy = posicaoy + velocidadey
    this.estanochao = false;

    if (this.posicaoY + this.height >= canvas.height) {//se o personagem ultrapassar a altura da tela jogar ele la pra baixo
        this.posicaoY = canvas.height - this.height;
        this.velocidadeY = 0;
        this.estanochao = true;
    }
}

pular() {
    if (this.estanochao) {//se esta no chao for true, velocidadey recebe forcadopulo e estanochao fica false
        this.framex = 0;//reinicia animações pra evitar bugs
        this.velocidadeY = this.forcadopulo;
        this.estanochao = false;
    }
}
}

const jogador = new Player();//instanciação de objeto

window.addEventListener("keydown", (e) => {//ao pressionar space, pular
    if (e.code === "Space") {
        e.preventDefault();//*nao sei pra que o prevent
        jogador.pular();
    }

    if (e.key === "d") {//ao pressionar d andar direita
        andandodireita = true;
    }
    if (e.key === "a") {//ao pressionar a andar esquerda
        andandoesquerda = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key === "d") {//ao soltar d parar andar direita
        andandodireita = false;
    }
    if (e.key === "a") {//ao soltar a parar andar esquerda
        andandoesquerda = false;
    }
});

window.addEventListener("resize", () => {//*preciso entender ainda
    canvas.width = window.innerWidth;
    canvas.height = 700;
    jogador.posicaoX = Math.min(jogador.posicaoX, canvas.width - jogador.width);
});