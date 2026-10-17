const ctx = canvas.getContext("2d");

let andandoesquerda = false;
let andandodireita = false;
const GRAVIDADE = 0.8;//*padrao 0.8

// Carrega os sprites usada pra animar o player
const imagemJogador = new Image();
imagemJogador.src = "assets/sprites/personagens/davi.png";
const larguraFrame = 256; // largura de cada frame
const alturaFrame = 256; // altura de cada frame
const framesPorAnimacao = 6; // quantidade de frames em cada linha 
const intervaloFrame = 10; // intervalo pra deixar a animação mais lenta, *padrao 5

class Player{ 
    width = 20;//largura do player, hitbox, padrao:150
    height = 20;//altura do player, hitbox padrao:150
    posicaoX = 100;//posiçâo x inicial do player
    posicaoY = 400;//posição y inicial do player
    velocidadeX = 0;//velocidade x inicial
    velocidadeY = 0;//velocidade y inicial
    forcadopulo = -22;//força do pulo, *padrao -22
    estanochao = true;//verificação se o personagem está no chão
    velocidadeandar = 6;//velocidade
    frameX = 0; // coluna do quadro atual
    frameY = 0; // linha do quadro atual
    gameFrame = 0; // controla o intervalo entre os quadros da animação
    direcao = 1;
    tiro = false;

draw(){//função pra definir o frame exibido
    // Aplicação da linha conforme valores de velocidade
    //animações horizontais
    if(this.tiro == true&&this.direcao == 1){
        this.frameY = 5;
    }
        else if(this.tiro == true&&this.direcao == -1){
            this.frameY = 6;
        }else
        
    

    if (this.velocidadeX < 0) {
        this.frameY = 2;//velocidade negativa, ou seja o personagem vai para esquerda, entãoa acessa a linha 2 dos sprites que é o personagem indo pra esquerda
    } else if (this.velocidadeX > 0) {
        this.frameY = 1;//velocidade positiva, ou seja o personagem vai para direita, então acessa a linha 1 dos sprites que é o personagem indo pra direita
    } else if(this.velocidadeX == 0){
        this.frameY = 0;//velocidade igual a zero então, acessa a linha 0 que é o personagem parado
    }else

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

        const ajustevisual = 12;//o sprite do personagem abaixo dele tem um espaço em branco, isso faz com que ele pareça flutuar nas plataformas
        //logo defino um valor que vai fazer ele ficar mais embaixo, somando no posicaodesenhoy
        // Centraliza o sprite dentro da largura usada para colisão do jogador
        const posicaoDesenhoX = this.posicaoX + (this.width - larguraDesenho) / 2;
        // Alinha a base do sprite com a base do jogador; Y cresce de cima para baixo no canvas
        const posicaoDesenhoY = this.posicaoY + this.height - alturaDesenho + ajustevisual;

          // Guarda o contexto antes de espelhar, para não afetar o cenário.
          ctx.save();

            // Espelha a pose parada quando o personagem está virado para a esquerda.
            if (this.frameY === 0 && this.direcao === -1) {
                ctx.translate(2 * posicaoDesenhoX + larguraDesenho, 0);
                ctx.scale(-1, 1);
            }


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
        // Restaura o contexto para os próximos desenhos não ficarem espelhados.
        ctx.restore();

      

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
}}

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


//inicio cplt
    // Guarda a posição vertical anterior à aplicação da gravidade. Ela será
    // comparada com a posição atual para detectar se o jogador cruzou o topo
    // de uma plataforma neste quadro.
    const yAnterior = this.posicaoY;//guarda o valor do topo da plataforma

// Aplica a gravidade à velocidade vertical e, em seguida, move o jogador.
this.velocidadeY += GRAVIDADE;
this.posicaoY += this.velocidadeY;
// O jogador só será considerado no chão novamente se uma colisão com uma
// plataforma ou com a base do canvas for detectada neste quadro.
this.estanochao = false;
//y - this.height = topo
//y + this.height = base

if (this.velocidadeY >= 0) {//se o jogador estiver parado ou descendol, faça
   
    for (const plataformaAtual of plataformas) {//plataformaAtual é a plataforma verificado nesse momento, de todas de plataformas
        
        const estavaAcima =
            yAnterior + this.height <= plataformaAtual.y;
        //como o y cresce pra baixo, pra cima diminui, ou seja, quanto menor o y, mais alto
        //o yAnterior + this.height vai calcular a altura da base do jogador, se ela for menor que a altura da plataforma atual, ou seja, mais alta, estavaAcima = true

        const passouPeloTopo =
            this.posicaoY + this.height >= plataformaAtual.y;//passoupelotopo é true se a base do jogador tiver abaixo ou na altura da plataforma

        const sobrepoeNaHorizontal =//define o limite horizontal da plataforma, verifica se o jogador da dentro dos limites horizontais
            this.posicaoX  > plataformaAtual.x &&
            this.posicaoX < plataformaAtual.x + plataformaAtual.largura;

        // Só há pouso quando as três condições são verdadeiras: o jogador
        // vinha de cima, cruzou o topo e está alinhado horizontalmente.
        if (estavaAcima && passouPeloTopo && sobrepoeNaHorizontal) {
            // Alinha a base do jogador exatamente ao topo da plataforma para
            // que ele não fique parcialmente dentro dela.
            this.posicaoY = plataformaAtual.y - this.height;
            
            this.velocidadeY = 0;//velocidade agora é 0, pois ele esta na plataforma
            this.estanochao = true;//como esta na plataforma pode pular novamente
            break;
        }
    }
}//fim cplt

    if (this.posicaoY + this.height >= canvas.height) {//se o personagem ultrapassar a altura da tela jogar ele la pra baixo
        this.posicaoY = canvas.height - this.height;
        this.velocidadeY = 0;
        this.estanochao = true;
    }
}

pular() {
    if (this.estanochao) {//se esta no chao for true, velocidadey recebe forcadopulo e estanochao fica false
        this.frameX = 0;//reinicia animações pra evitar bugs
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
        jogador.direcao = 1;
    }
    if (e.key === "a") {//ao pressionar a andar esquerda
        andandoesquerda = true;
        jogador.direcao = -1;
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

window.addEventListener("mousedown", (e) => {//ao clicar no mouse fazer:
        e.preventDefault();
        jogador.tiro = true;
        atirar();
})

window.addEventListener("mouseup", (e) => {//ao soltar o mouse fazer:
        e.preventDefault();
        jogador.tiro = false;
})
