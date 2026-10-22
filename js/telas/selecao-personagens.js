const canvasAnder = document.getElementById("sprite-ander");
const canvasJoabe = document.getElementById("sprite-joabe");
const canvasVinicius = document.getElementById("sprite-vinicius");
const canvasDavi = document.getElementById("sprite-davi");
const canvasJoaquim = document.getElementById("sprite-joaquim");

// crio um contexto pra cada personagem (Nao sei se vai fazer o jogo travar, seja o que deus quiser)
const ctxAnder = canvasAnder.getContext("2d");
const ctxJoabe = canvasJoabe.getContext("2d");
const ctxVinicius = canvasVinicius.getContext("2d");
const ctxDavi = canvasDavi.getContext("2d");
const ctxJoaquim = canvasJoaquim.getContext("2d");

const imagemSelecaoDavi = new Image();
imagemSelecaoDavi.src = "assets/sprites/personagens/davi.png";

const imagemSelecaoVinicius = new Image();
imagemSelecaoVinicius.src = "assets/sprites/personagens/vinicius.png";

const imagemSelecaoJoabe = new Image();
imagemSelecaoJoabe.src = "assets/sprites/personagens/joabe.png";

const imagemSelecaoJoaquim = new Image();
imagemSelecaoJoaquim.src = "assets/sprites/personagens/joaquim.png";

const imagemSelecaoJoanderson = new Image();
imagemSelecaoJoanderson.src = "assets/sprites/personagens/joanderson.png";


const larguraFrameSelecao = 256;
const alturaFrameSelecao = 256;

const colunasSelecao = 6;
const intervaloFrameSelecao = 8;   // maior = mais lento

let frameXSelecao = 0;
let gameFrameSelecao = 0;

// Desenha o quadro atual em UM canvas (o canvas tem 256x256, igual ao quadro)
function desenharPersonagem(contexto, imagem, linhaAnimacaoSelecao) {
    contexto.clearRect(0, 0, larguraFrameSelecao, alturaFrameSelecao);

    if (imagem.complete && imagem.naturalWidth > 0) { // Espera carregar
        contexto.drawImage(
            imagem,
            frameXSelecao * larguraFrameSelecao,         // coluna do quadro atual
            linhaAnimacaoSelecao * alturaFrameSelecao,   // linha da animação (antes era 0)
            larguraFrameSelecao,
            alturaFrameSelecao,
            0,
            0,
            larguraFrameSelecao,
            alturaFrameSelecao
        );
    }
}

function animarSelecao() {
    requestAnimationFrame(animarSelecao); // Fica rodando a 60 fps

    // Um desenho por cartão, chamados um a um
    desenharPersonagem(ctxAnder, imagemSelecaoJoanderson, 1);
    desenharPersonagem(ctxJoabe, imagemSelecaoJoabe, 13);
    desenharPersonagem(ctxVinicius, imagemSelecaoVinicius, 5);
    desenharPersonagem(ctxDavi, imagemSelecaoDavi, 0);
    desenharPersonagem(ctxJoaquim, imagemSelecaoJoaquim, 2);

    if ( gameFrameSelecao % intervaloFrameSelecao === 0 ) {
        frameXSelecao += 1;

        if ( frameXSelecao >= colunasSelecao ) {
            frameXSelecao = 0;
        }
    }
    gameFrameSelecao++;
}

animarSelecao();