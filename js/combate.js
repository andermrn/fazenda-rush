class Projetil {
    constructor(x, y, direcao) {
        this.x = x;
        this.y = y;


        this.largura = 12;
        this.altura = 6;

        this.velocidade = 8;
        this.direcao = direcao;

        this.ativo = true;
    }

    atualizar() {
        this.x += this.velocidade * this.direcao;

        if (this.x > canvas.width || this.x + this.largura < 0) {
            this.ativo = false;
        }
    }

    desenhar() {
        ctx.fillStyle = "#ffd166";

        ctx.fillRect(
            this.x,
            this.y,
            this.largura,
            this.altura
        );
    }


}

const projeteis = [];

function detectarColisao(a, b) {
    return (
        a.x < b.x + b.largura &&
        a.x + a.largura > b.x &&
        a.y < b.y + b.altura &&
        a.y + a.altura > b.y
    );
}

function atirar() {
    const x = jogador.direcao === 1
        ? jogador.posicaoX + jogador.width
        : jogador.posicaoX - 12;


    const y = jogador.posicaoY - 40;

    projeteis.push(
        new Projetil(x, y, jogador.direcao)
    );


}

function atualizarProjeteis() {
    for (const projetil of projeteis) {
        projetil.atualizar();
    }

    for (let i = projeteis.length - 1; i >= 0; i--) {
        if (!projeteis[i].ativo) {
            projeteis.splice(i, 1);
        }
    }


}

function desenharProjeteis() {
    for (const projetil of projeteis) {
        projetil.desenhar();
    }
}

// Reúne todos os inimigos e chefes que podem receber dano.
function obterAlvos() {
    return [
        ...inimigos,
        abelha1,
        ...peixes,
        bodao,
        carpa,
        rainha
    ];
}

// Verifica se o alvo já morreu.
function alvoEstaMorto(alvo) {
    return alvo.morto === true || alvo.morta === true;
}

// Aplica dano e elimina o alvo quando sua vida chega a zero.
function causarDano(alvo) {
    if (alvoEstaMorto(alvo)) {
        return;
    }

    alvo.vida--;

    console.log(
        `${alvo.constructor.name}: ${alvo.vida} de vida restante`
    );

    if (alvo.vida <= 0) {
        alvo.vida = 0;

        if ("morta" in alvo) {
            alvo.morta = true;
        } else {
            alvo.morto = true;
        }

        console.log(`${alvo.constructor.name} foi derrotado!`);
    }


}

function verificarColisoes() {
    const alvos = obterAlvos();


    // Verifica os projéteis contra todos os inimigos.
    for (let i = projeteis.length - 1; i >= 0; i--) {
        const projetil = projeteis[i];

        if (!projetil.ativo) {
            continue;
        }

        for (const alvo of alvos) {
            if (alvoEstaMorto(alvo)) {
                continue;
            }

            if (detectarColisao(projetil, alvo)) {
                causarDano(alvo);

                // Um projétil só pode atingir um alvo.
                projetil.ativo = false;

                break;
            }
        }
    }

    // Remove os projéteis que atingiram algum alvo.
    for (let i = projeteis.length - 1; i >= 0; i--) {
        if (!projeteis[i].ativo) {
            projeteis.splice(i, 1);
        }
    }

    // Define a área de colisão do jogador.
    const areaJogador = {
        x: jogador.posicaoX,
        y: jogador.posicaoY,
        largura: jogador.width,
        altura: jogador.height
    };

    // Verifica o contato do jogador com todos os inimigos vivos.
    for (const alvo of alvos) {
        if (alvoEstaMorto(alvo)) {
            continue;
        }

        if (detectarColisao(areaJogador, alvo)) {
            jogador.receberDano();
            break;
        }
    }
}
