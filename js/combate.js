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

        // Desativa o disparo quando ele sai da tela.
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

    const y = jogador.posicaoY - 40

    projeteis.push(
        new Projetil(x, y, jogador.direcao)
    );
}

window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !e.repeat) {
        e.preventDefault();
        atirar();
    }
});

function atualizarProjeteis() {
    for (const projetil of projeteis) {
        projetil.atualizar();
    }

    // Remove os disparos que já saíram da tela.
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

function verificarColisoes() {
    for (let i = projeteis.length - 1; i >= 0; i--) {
        const projetil = projeteis[i];

        if (!projetil.ativo) continue;

        if (!inimigo.morto && detectarColisao(projetil, inimigo)) {
            inimigo.vida--;

            projetil.ativo = false;

            if (inimigo.vida <= 0) {
                inimigo.morto = true;
            }
        }
    }

    for (let i = projeteis.length - 1; i >= 0; i--) {
        if (!projeteis[i].ativo) {
            projeteis.splice(i, 1);
        } 
    }
}