const canvas = document.getElementById("canvas");

function ajustarCanvas() {
    canvas.height = 900;
    canvas.width = Math.round(900 * window.innerWidth / window.innerHeight);
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

const plataforma1 = new plataforma(670,450,300,40,"assets/cenarios/plataformac.png")
const plataforma2 = new plataforma(180,650,300,40,"assets/cenarios/plataformac.png")
const plataforma3 = new plataforma(1160,650,300,40,"assets/cenarios/plataformac.png")
const plataformas = [plataforma1, plataforma2, plataforma3];//cplt

const portal = new Portal();

let faseAtual = 1;

// Pré-carrega o cenário da fase 2 (o navegador já baixa a imagem antes de precisar dela)
const cenarioFase2 = new Image();
cenarioFase2.src = "assets/cenarios/cenario2.png";

function trocarCenario() {
    if( faseAtual === 1 ) {
        canvas.style.backgroundImage = 'url("assets/cenarios/cenario2.png")';
        faseAtual = 2;

        // Volta o jogador para o começo da fase, no chão
        jogador.posicaoX = 100;
        jogador.posicaoY = canvas.height - jogador.height;
    } else {
        canvas.style.backgroundImage = 'url("assets/cenarios/cenario1.jpeg")';
        faseAtual = 1;

        // Volta o jogador para o começo da fase, no chão
        jogador.posicaoX = 100;
        jogador.posicaoY = canvas.height - jogador.height;
    }
}

let jogoEncerrado = false;
function reiniciarPartida() {
    jogador.reiniciar();
    inimigo.reiniciar();
    abelha1.reiniciar();
    projeteis.length = 0;
    jogoEncerrado = false;
    window.reiniciarPartida = reiniciarPartida;
}

function animate(){
    requestAnimationFrame(animate);
    if (jogoEncerrado) {
    return;
}

if (jogador.vidas <= 0) {
    jogoEncerrado = true;
    window.voltarParaSelecao();
    return;
}
    ctx.clearRect(0,0,canvas.width,canvas.height);

    jogador.update();
    jogador.draw();

    abelha1.mover();
    abelha1.draw();

    inimigo.atualizar();
    inimigo.draw();

    plataforma1.draw();
    plataforma2.draw();
    plataforma3.draw();

    portal.atualizar();   
    portal.draw();        
    if (portal.colisaoJogador() === true) {
        trocarCenario();
    }

    atualizarProjeteis();
    verificarColisoes();
    desenharProjeteis();
}
animate();