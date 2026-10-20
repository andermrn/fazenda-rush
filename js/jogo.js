const canvas = document.getElementById("canvas");

function ajustarCanvas() {
    canvas.height = 900;
    canvas.width = Math.round(900 * window.innerWidth / window.innerHeight);
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);
 
const plataforma1 = new plataforma(670, 450, 300, 40, "assets/cenarios/plataformac.png")
const plataforma2 = new plataforma(180, 650, 300, 40, "assets/cenarios/plataformac.png")
const plataforma3 = new plataforma(1160, 650, 300, 40, "assets/cenarios/plataformac.png")
const plataformas = [plataforma1, plataforma2, plataforma3];//cplt

const carpa = new Carpa();
const bodao = new Bodao();
const rainha = new Rainha();

const inimigo1 = new Inimigo(plataforma1);
const inimigo2 = new Inimigo(plataforma2);
const inimigo3 = new Inimigo(plataforma3);

const inimigos = [inimigo1, inimigo2, inimigo3];

const inimigo = inimigo1; // Compatibilidade com o combate antigo

const portalAbelha = new Portal("abelha", 5, "assets/cenarios/portais/portal-abelha.png");
const portalPeixe = new Portal("peixe", 24, "assets/cenarios/portais/portal-peixe.png");
let faseAtual = 1;

// Pré-carrega o cenário da fase 2 (o navegador já baixa a imagem antes de precisar dela)
const cenarioFase2 = new Image();
cenarioFase2.src = "assets/cenarios/cenario-fase2.png";

function trocarCenario() {
    if (faseAtual === 1) {
        canvas.style.backgroundImage = 'url("assets/cenarios/fases/cenario-fase2.png")';
        faseAtual = 2;

        // Volta o jogador para o começo da fase, no chão
        jogador.posicaoX = 100;
        jogador.posicaoY = canvas.height - jogador.height;
    } else if( faseAtual === 2 ) {
        canvas.style.backgroundImage = 'url("assets/cenarios/fases/cenario-fase3.png")';
        faseAtual = 3;

        // Volta o jogador para o começo da fase, no chão
        jogador.posicaoX = 100;
        jogador.posicaoY = canvas.height - jogador.height;
    }
}

let jogoEncerrado = false;
function reiniciarPartida() {
    jogador.reiniciar();

    for (const inimigo of inimigos) {
        inimigo.reiniciar();
    }

    abelha1.reiniciar();
    projeteis.length = 0;
    jogoEncerrado = false;
    window.reiniciarPartida = reiniciarPartida;
}

function animate() {
    requestAnimationFrame(animate);
    if (jogoEncerrado) {
        return;
    }

    if (jogador.vidas <= 0) {
        jogoEncerrado = true;
        window.voltarParaSelecao();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    jogador.update();
    jogador.draw();
    
    carpa.mover();
    carpa.draw();
     
    rainha.draw();
    rainha.mover();
    
    bodao.movimento();
    bodao.draw();

    abelha1.mover();
    abelha1.draw();

    peixe1.mover();
    peixe1.draw();

 for (const inimigo of inimigos) {
    inimigo.atualizar(); //ele percorre a lista inimigos e atualiza os três, um por vez, a cada quadro do jogo.
    inimigo.draw();
   }

    plataforma1.draw();
    plataforma2.draw();
    plataforma3.draw();

    if( faseAtual === 1 ) {
        portalAbelha.atualizar();
        portalAbelha.draw();
        if (portalAbelha.colisaoJogador() === true) {
            trocarCenario();
        }
    } else if( faseAtual === 2 ) {
        portalPeixe.atualizar();
        portalPeixe.draw();
        if (portalAbelha.colisaoJogador() === true) {
            trocarCenario();
        }
    }

    atualizarProjeteis();
    verificarColisoes();
    desenharProjeteis();
}
animate();