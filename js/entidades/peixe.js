const imagemPeixe = new Image();
imagemPeixe.src = "assets/sprites/fase3/inimigo.png";

// Tamanho de cada sprite: 96x96
const larguraFramePeixe = 96;
const alturaFramePeixe = 96;

// Número de colunas por linha
const colunasPeixe = 4;
const intervaloFramePeixe = 8;
const escalaPeixe = 1; // Escala do peixe: 1 = tamanho original do desenho (96x96)

class Peixe {
    constructor(plataforma) {
        this.vida = 10;
        this.morto = false;

        // Usa o tamanho de um quadro da sprite do peixe.
        this.altura = alturaFramePeixe * escalaPeixe;
        this.largura = larguraFramePeixe * escalaPeixe;

        // Guarda a plataforma original para reiniciar o peixe no lugar certo.
        this.plataformaInicial = plataforma;
        this.plataformaAtual = plataforma;

        this.x = plataforma.x + 50;
        this.y = plataforma.y - this.altura;

        // Movimento
        this.velocidade = 2;
        this.velocidadeY = 0;
        this.gravidade = 0.5;
        this.forcaPulo = -10;
        this.estanochao = true;
        this.direcaoX = 1;

        // Intervalo aleatório entre os pulos.
        this.intervaloSalto = this.gerarIntervaloSalto();
        this.contadorSalto = 0;

        // Controle da mudança aleatória de direção.
        this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();
        this.contadorDirecao = 0;

        // Inteligência: "patrulhando" ou "perseguindo"
        this.estado = "patrulhando";
        this.alcanceDeteccao = 180;

        // Animação (linha 0 = direita, 1 = esquerda, 2 = morde direita, 3 = morde esquerda)
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;

        this.atacando = false;
        this.olhandoDireita = true;
    }

    // Gera um intervalo aleatório entre 60 e 150 quadros para os pulos.
    gerarIntervaloSalto() {
        return Math.floor(Math.random() * 91) + 60;
    }

    // Gera um intervalo aleatório entre 60 e 180 quadros para mudar de direção.
    gerarIntervaloDirecao() {
        return Math.floor(Math.random() * 121) + 60;
    }

    reiniciar() {
        this.vida = 10;
        this.morto = false;

        this.plataformaAtual = this.plataformaInicial;

        this.x = this.plataformaAtual.x + 50;
        this.y = this.plataformaAtual.y - this.altura;

        this.velocidade = 2;
        this.velocidadeY = 0;
        this.direcaoX = 1;

        this.estanochao = true;
        this.contadorSalto = 0;

        this.estado = "patrulhando";
        this.atacando = false;

        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.olhandoDireita = true;
        this.intervaloSalto = this.gerarIntervaloSalto();
        this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();
        this.contadorDirecao = 0;
    }

    // Verifica se o jogador está apoiado na mesma plataforma do peixe.
    jogadorNaMesmaPlataforma() {
        const plataforma = this.plataformaAtual;

        const baseJogador =
            jogador.posicaoY + jogador.height;

        const jogadorSobrePlataforma =
            jogador.posicaoX + jogador.width > plataforma.x &&
            jogador.posicaoX < plataforma.x + plataforma.largura;

        const alinhadoComTopo =
            Math.abs(baseJogador - plataforma.y) <= 3;

        return (
            jogador.estanochao &&
            jogadorSobrePlataforma &&
            alinhadoComTopo
        );
    }

    // Decide se o peixe deve patrulhar ou perseguir.
    atualizarEstado() {
        if (this.morto) return;

        const mesmaPlataforma = this.jogadorNaMesmaPlataforma();

        const centroPeixe = this.x + this.largura / 2;
        const centroJogador =
            jogador.posicaoX + jogador.width / 2;

        const distanciaX = Math.abs(centroJogador - centroPeixe);

        if (
            mesmaPlataforma &&
            distanciaX <= this.alcanceDeteccao
        ) {
            this.estado = "perseguindo";

            if (centroJogador > centroPeixe) {
                this.direcaoX = 1;
            } else if (centroJogador < centroPeixe) {
                this.direcaoX = -1;
            }
        } else {
            // Se perder o jogador ou ele sair da plataforma, retorna à patrulha.
            this.estado = "patrulhando";
        }
    }

    atualizar() {
        if (this.morto) return;

        this.atualizarEstado();


        const plataforma = this.plataformaAtual;

        // Só muda de direção aleatoriamente durante a patrulha.
        if (this.estado === "patrulhando") {
            this.contadorDirecao++;

            if (this.contadorDirecao >= this.intervaloMudancaDirecao) {
                this.direcaoX *= -1;

                this.contadorDirecao = 0;
                this.intervaloMudancaDirecao = this.gerarIntervaloDirecao();
            }
        } else {
            // Ao perseguir o jogador, não usa a mudança aleatória.
            this.contadorDirecao = 0;
        }

        // Guarda a posição anterior para detectar a aterrissagem
        const yAnterior = this.y;

        // Aplica a gravidade e atualiza a posição vertical
        this.velocidadeY += this.gravidade;
        this.y += this.velocidadeY;

        // A perseguição é mais rápida que a patrulha.
        this.velocidade = this.estado === "perseguindo" ? 3 : 2;

        // Atualiza a posição horizontal
        this.x += this.velocidade * this.direcaoX;

        // Limites horizontais da plataforma atual
        const limiteEsquerdo = plataforma.x;
        const limiteDireito =
            plataforma.x + plataforma.largura - this.largura;

        if (this.x <= limiteEsquerdo) {
            this.x = limiteEsquerdo;
            this.direcaoX = 1;
        } else if (this.x >= limiteDireito) {
            this.x = limiteDireito;
            this.direcaoX = -1;
        }

        // Verifica se o Peixe aterrissou na plataforma
        const estavaAcima =
            yAnterior + this.altura <= plataforma.y;

        const passouPeloTopo =
            this.y + this.altura >= plataforma.y;

        const sobrepoeNaHorizontal =
            this.x + this.largura > plataforma.x &&
            this.x < plataforma.x + plataforma.largura;

        if (
            this.velocidadeY >= 0 &&
            estavaAcima &&
            passouPeloTopo &&
            sobrepoeNaHorizontal
        ) {
            this.y = plataforma.y - this.altura;
            this.velocidadeY = 0;
            this.estanochao = true;
        } else {
            this.estanochao = false;
        }

        // Verifica o chão do canvas
        if (this.y + this.altura >= canvas.height) {
            this.y = canvas.height - this.altura;
            this.velocidadeY = 0;
            this.estanochao = true;
        }

        // Espera antes de iniciar outro salto
        if (this.estanochao) {
            this.contadorSalto++;

            if (this.contadorSalto >= this.intervaloSalto) {
                this.velocidadeY = this.forcaPulo;
                this.estanochao = false;
                this.contadorSalto = 0;

                // Sorteia o tempo de espera para o próximo pulo.
                this.intervaloSalto = this.gerarIntervaloSalto();
            }
        }
    }

    // === [ DAVI ] === 
    draw() {
        // Peixe morto não é desenhado
        if (this.morto) return;

        // linha 0 = direita e linha 1 = esquerda
        if (this.direcaoX === -1) {
            this.olhandoDireita = false;
        } else if (this.direcaoX === 1) {
            this.olhandoDireita = true;
        }

        if (this.atacando === true) {
            if (this.olhandoDireita === true) {
                this.frameY = 2;
            } else this.frameY = 3;
        } else {
            if (this.olhandoDireita === true) {
                this.frameY = 0;   // nadando para a direita
            } else this.frameY = 1;   // nadando para a esquerda
        }

        if (imagemPeixe.complete && imagemPeixe.naturalWidth > 0) {
            ctx.drawImage(
                imagemPeixe,                       // a folha de sprites inteira
                this.frameX * larguraFramePeixe,   // onde começa o recorte (horizontal)
                this.frameY * alturaFramePeixe,    // onde começa o recorte (vertical)
                larguraFramePeixe,
                alturaFramePeixe,
                this.x,
                this.y,
                this.largura,
                this.altura
            );
        }

        // Troca de quadro a cada "intervaloFramePeixe" chamadas do draw()
        if (this.gameFrame % intervaloFramePeixe === 0) {
            this.frameX = this.frameX + 1;

            if (this.frameX >= colunasPeixe) {
                this.frameX = 0;
            }
        }

        this.gameFrame = this.gameFrame + 1;
    }
}
