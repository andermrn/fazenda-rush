// Plataformas [ DAVI ]
const plataforma_fase1_1 = new plataforma(670, 650, 300, 40, "assets/cenarios/plataforma.png");
const plataforma_fase1_2 = new plataforma(180, 650, 300, 40, "assets/cenarios/plataforma.png");
const plataforma_fase1_3 = new plataforma(1160, 650, 300, 40, "assets/cenarios/plataforma.png");
const plataformas_fase1 = [plataforma_fase1_1, plataforma_fase1_2, plataforma_fase1_3];

const plataforma_fase2_1 = new plataforma(300, 650, 300, 40, "assets/cenarios/plataforma.png");
const plataforma_fase2_2 = new plataforma(300, 400, 300, 40, "assets/cenarios/plataforma.png");
const plataforma_fase2_3 = new plataforma(1100, 400, 300, 40, "assets/cenarios/plataforma.png");
const plataforma_fase2_4 = new plataforma(1100, 650, 300, 40, "assets/cenarios/plataforma.png");
const plataformas_fase2 = [plataforma_fase2_1, plataforma_fase2_2, plataforma_fase2_3, plataforma_fase2_4];

const plataforma_fase3_1 = new plataforma(670,450,300,40,"assets/cenarios/plataforma.png");
const plataforma_fase3_2 = new plataforma(180,650,300,40,"assets/cenarios/plataforma.png");
const plataforma_fase3_3 = new plataforma(1160,650,300,40,"assets/cenarios/plataforma.png");
const plataformas_fase3 = [plataforma_fase3_1, plataforma_fase3_2, plataforma_fase3_3];





// Um bode em cada plataforma
const inimigos = [
    new Inimigo(plataforma_fase1_1),
    new Inimigo(plataforma_fase1_2),
    new Inimigo(plataforma_fase1_3)
];

const abelhas = [
    new Abelha(),
    new Abelha(),
    new Abelha()
];

// Cria um peixe em cada plataforma.
const peixes = [
    new Peixe(plataforma_fase3_1),
    new Peixe(plataforma_fase3_2),
    new Peixe(plataforma_fase3_3)
];

// Chefes
const bodao = new Bodao();
const carpa = new Carpa();
const rainha = new Rainha();


// Portais para a próxima fase
const portalAbelha = new Portal("abelha", 5, "assets/cenarios/portais/portal-abelha.png");
const portalPeixe = new Portal("peixe", 24, "assets/cenarios/portais/portal-peixe.png");


const fases = [ 
    {
        cenario: "",
        alvos:  [...inimigos, bodao], // ESSES ... "DESPEJAM" OS ITENS DO ARRAY DE INIMIGOS [DAVI]
        plataformas: plataformas_fase1,
        portal: portalAbelha
    },
    {
        cenario: "assets/cenarios/fases/cenario-fase2.png",
        alvos:  [...abelhas, rainha],
        plataformas: plataformas_fase2,
        portal: portalPeixe
    },
    {
        cenario: "assets/cenarios/fases/cenario-fase3.png",
        alvos: [...peixes, carpa],
        plataformas: plataformas_fase3,
        portal: null // última fase: não tem portal
    }
];


let faseAtual = 1;

// [ EU CRIEI ISSO AQUI PRA RESOLVER UM BUG ]
// Só roda o jogo quando a tela de jogo está aberta
let jogoRodando = false;


function iniciarFase( numero ) {
    faseAtual = numero;

    const fase = fases[numero - 1];

    canvas.style.backgroundImage = "";
    if (fase.cenario !== "") { // Ou seja, nao for a PRIMEIRA fase  
        canvas.style.backgroundImage = 'url("' + fase.cenario + '")';
    }

    // Leva o jogador para o começo da fase, no chão
    jogador.posicaoX = 100;
    jogador.posicaoY = canvas.height - jogador.height;
    jogador.velocidadeY = 0;
}

function alvosDaFase() {
    return fases[faseAtual - 1].alvos;
}
function plataformasDaFase() {
    return fases[faseAtual - 1].plataformas;
}

// Devolve true quando todos os inimigos e o chefe da fase estão mortos
function faseLimpa() {
    for (const alvo of alvosDaFase()) {
        if (alvo.morto === false) {
            return false;
        }
    }

    return true;
}

// Para o jogo, desenha a mensagem de vitória e volta para a seleção depois de 4 segundos
function mostrarVitoria() {
    jogoRodando = false;

    // save/restore: as configurações de texto não afetam o resto do jogo
    ctx.save();

    // Escurece a tela inteira
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Escreve a mensagem no centro
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "bold 80px sans-serif";
    ctx.fillText("VITÓRIA!", canvas.width / 2, canvas.height / 2);

    ctx.font = "32px sans-serif";
    ctx.fillText("Você salvou a fazenda!", canvas.width / 2, canvas.height / 2 + 60);

    ctx.restore();

    setTimeout(() => {
        window.voltarParaSelecao();
    }, 10000); // Esperar 10 segundinhos
}


// Volta tudo ao começo para uma nova partida
function reiniciarPartida() {
    iniciarFase(1); // Joga o player para a fase 1

    jogador.reiniciar();

    for (const alvo of obterAlvos()) {
        alvo.reiniciar();
    }

    projeteis.length = 0;
    jogoRodando = true;
}

let podeSairDoGameOver = false;

function animate() {
    requestAnimationFrame(animate);


    if (jogoRodando === false) {
        return;
    }

    // Sem vidas: para o jogo e volta para a seleção
    if (jogador.vidas <= 0) {
        jogoRodando = false;
        document.getElementById("tela-game-over").hidden = false;
        podeSairDoGameOver = true;

        setTimeout(() => {
            window.addEventListener("keydown", () => {
                if( podeSairDoGameOver === true ) {
                    document.getElementById("tela-game-over").hidden = true;
                    window.voltarParaSelecao();
                    podeSairDoGameOver = false;
                }
            });
        }, 2000); // Esperar 10 segundinhos
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    jogador.update();
    jogador.draw();

    // Só os bodes, abelha, peixes e chefes da fase atual
    for (const alvo of alvosDaFase()) {
        alvo.atualizar();
        alvo.draw();
    }

    for (const plataformaAtual of plataformasDaFase()) {
        plataformaAtual.draw();
    }

    const portalDaFase = fases[faseAtual - 1].portal;

    if ( portalDaFase !== null && faseLimpa() === true ) { // Ou seja, terceira fase
        portalDaFase.atualizar();
        portalDaFase.draw();

        if ( portalDaFase.colisaoJogador() === true ) {
            iniciarFase(faseAtual + 1);
        }
    }


    if ( fases[faseAtual - 1].portal === null && faseLimpa() === true ) { // OU SEJA, QUANDO ESTIVER FINALIZADA!
        mostrarVitoria();
    }

    atualizarProjeteis();
    verificarColisoes();
    desenharProjeteis();
}

animate();