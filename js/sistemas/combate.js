let pontuacao = 0;
let pontos = document.getElementById("pontos");
let inimigos2 = document.getElementById("ninimigos");
let inimigosrestantes = 12;

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
        ...abelhas,
        ...peixes,
        bodao,
        carpa,
        rainha
    ];
}

// Tira 1 de vida do alvo e marca como morto quando a vida acaba.
function causarDano(alvo) {
    alvo.vida--;

    if (alvo.vida <= 0) {
        alvo.vida = 0;
        alvo.morto = true;
        pontuacao++;
        pontos.textContent = pontuacao;
        inimigosrestantes--;
        inimigos2.textContent = inimigosrestantes;
        console.log(pontuacao);
    }
}

function verificarColisoes() {
    const alvos = alvosDaFase();

    // Verifica os projéteis contra todos os alvos vivos.
    for (let i = projeteis.length - 1; i >= 0; i--) {
        const projetil = projeteis[i];

        if (!projetil.ativo) {
            continue;
        }

        for (const alvo of alvos) {
            if (alvo.morto) {
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

    // Área de colisão do jogador.
    const areaJogador = {
        x: jogador.posicaoX,
        y: jogador.posicaoY,
        largura: jogador.width,
        altura: jogador.height
    };

    // Se encostar em qualquer alvo vivo, o jogador leva dano.
    for (const alvo of alvos) {
        if (alvo.morto) {
            continue;
        }

        if (detectarColisao(areaJogador, alvo)) {
            jogador.receberDano();
            break;
        }
    }
}