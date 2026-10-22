const imagemPeixe = new Image();
imagemPeixe.src = "assets/sprites/fase3/inimigo.png";

// Tamanho de cada sprite: 96x96
const larguraFramePeixe = 96;
const alturaFramePeixe = 96;

// Número de colunas por linha
const colunasPeixe = 4;
const intervaloFramePeixe = 8;
const escalaPeixe = 1;

class Peixe {
    constructor(plataforma) {
        this.vida = 10;
        this.morto = false;

        this.altura = alturaFramePeixe * escalaPeixe;
        this.largura = larguraFramePeixe * escalaPeixe;

        // Guarda a plataforma para reiniciar o peixe.
        this.plataformaInicial = plataforma;
        this.plataformaAtual = plataforma;

        this.x = plataforma.x + 50;
        this.y = plataforma.y - this.altura;

        // Movimento e física
        this.velocidade = 2;
        this.velocidadeY = 0;
        this.gravidade = 0.5;
        this.forcaPulo = -10;
        this.estanochao = true;
        this.direcaoX = 1;

        // Intervalo aleatório entre os pulos.
        this.intervaloSalto = this.gerarIntervaloSalto();
        this.contadorSalto = 0;

        // Patrulha: usa o mesmo padrão de tempo do Inimigo.
        this.proximaMudanca =
            Date.now() + 2000 + Math.random() * 3000;

        // Inteligência artificial
        this.estado = "patrulhando";
        this.alcanceDeteccao = 150;

        // Animação
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
        this.intervaloSalto = this.gerarIntervaloSalto();

        this.proximaMudanca =
            Date.now() + 2000 + Math.random() * 3000;

        this.estado = "patrulhando";
        this.atacando = false;

        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.olhandoDireita = true;
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

    // Calcula a distância horizontal entre as bordas dos personagens.
    calcularDistancia() {
        const distanciaEsquerda =
            jogador.posicaoX - (this.x + this.largura);

        const distanciaDireita =
            this.x - (jogador.posicaoX + jogador.width);

        if (this.x + this.largura < jogador.posicaoX) {
            return distanciaEsquerda;
        }

        if (this.x > jogador.posicaoX + jogador.width) {
            return distanciaDireita;
        }

        // Se as áreas horizontais se sobrepõem, a distância é zero.
        return 0;
    }

    // Decide se o peixe deve patrulhar ou perseguir.
    atualizarEstado() {
        if (this.morto) return;

        const mesmaPlataforma = this.jogadorNaMesmaPlataforma();
        const distancia = this.calcularDistancia();

        if (
            mesmaPlataforma &&
            distancia <= this.alcanceDeteccao
        ) {
            this.estado = "perseguindo";
        } else {
            this.estado = "patrulhando";
        }
    }

    atualizar() {
        if (this.morto) return;

        this.atacando = false;

        // Primeiro, a IA decide o estado atual.
        this.atualizarEstado();

        const plataforma = this.plataformaAtual;

        const limiteEsquerdo = plataforma.x;

        const limiteDireito =
            plataforma.x + plataforma.largura - this.largura;

        // A velocidade depende do estado da IA.
        if (this.estado === "perseguindo") {
            this.velocidade = 3; // Persegue o jogador mais rápido.
        } else {
            this.velocidade = 2; // Patrulha em velocidade normal.
        }

        // Perseguição
        if (this.estado === "perseguindo") {
            const distancia = this.calcularDistancia();

            // Se o peixe estiver à esquerda do jogador.
            if (this.x + this.largura <= jogador.posicaoX) {
                this.direcaoX = 1;
            }
            // Se o peixe estiver à direita do jogador.
            else if (this.x >= jogador.posicaoX + jogador.width) {
                this.direcaoX = -1;
            }

            // Aproxima-se sem ultrapassar a distância restante.
            const passo = Math.min(this.velocidade, distancia);

            // Verifica se ainda existe distância entre o peixe e o jogador.
            if (distancia > 0) {

                // Verifica se o peixe está indo para a direita.
                if (this.direcaoX === 1) {

                    // Avança o peixe para a direita sem ultrapassar o limite da plataforma.
                    this.x = Math.min(
                        limiteDireito,
                        this.x + passo
                    );

                } else {

                    // Avança o peixe para a esquerda sem ultrapassar o limite da plataforma.
                    this.x = Math.max(
                        limiteEsquerdo,
                        this.x - passo
                    );
                }

            } else {

                // As áreas horizontais se sobrepõem.
                this.atacando = true;
            }

        } else {

            // Patrulha com mudança aleatória de direção.
            if (Date.now() >= this.proximaMudanca) {

                // Sorteia uma nova direção para o peixe.
                if (Math.random() < 0.5) {
                    this.direcaoX = -1; // Vai para a esquerda.
                } else {
                    this.direcaoX = 1; // Vai para a direita.
                }

                // Define o tempo da próxima mudança de direção, entre 2 e 5 segundos.
                this.proximaMudanca =
                    Date.now() + 2000 + Math.random() * 3000;
            }

            // ALTERADO: verifica se o peixe chegou ao limite esquerdo.
            if (this.x <= limiteEsquerdo) {
                this.x = limiteEsquerdo;
                this.direcaoX = 1;
            }

            // ALTERADO: verifica se o peixe chegou ao limite direito.
            else if (this.x >= limiteDireito) {
                this.x = limiteDireito;
                this.direcaoX = -1;
            }

            // ALTERADO: movimenta o peixe respeitando a direção corrigida.
            this.x += this.velocidade * this.direcaoX;

            // ALTERADO: impede que o movimento ultrapasse os limites.
            if (this.x < limiteEsquerdo) {
                this.x = limiteEsquerdo;
            } else if (this.x > limiteDireito) {
                this.x = limiteDireito;
            }
        }

        // Guarda a posição anterior para detectar a aterrissagem.
        // Guarda a posição vertical anterior do peixe para verificar se ele estava acima da plataforma.
        const yAnterior = this.y;

        // Aumenta a velocidade vertical do peixe de acordo com a gravidade.
        this.velocidadeY += this.gravidade;
        this.y += this.velocidadeY;

        // Verifica se a parte inferior do peixe estava acima do topo da plataforma antes de se movimentar.
        const estavaAcima =
            yAnterior + this.altura <= plataforma.y;

        const passouPeloTopo =
            this.y + this.altura >= plataforma.y;

        // Verifica se a parte inferior do peixe chegou ao topo da plataforma ou passou dele após o movimento.
        const sobrepoeNaHorizontal =
            this.x + this.largura > plataforma.x &&
            this.x < plataforma.x + plataforma.largura;

        // Verifica se o peixe está descendo ou parado, estava acima da plataforma, chegou ao topo dela e está sobre ela horizontalmente.
        if (
            this.velocidadeY >= 0 &&
            estavaAcima &&
            passouPeloTopo &&
            sobrepoeNaHorizontal
        ) {
            // Posiciona o peixe exatamente em cima da plataforma.
            this.y = plataforma.y - this.altura;

            // Zera a velocidade vertical para interromper a queda.
            this.velocidadeY = 0;

            // Informa que o peixe está apoiado em uma superfície.
            this.estanochao = true;
        } else {
            this.estanochao = false;
        }

        // Verifica se a parte inferior do peixe chegou ao chão do canvas.
        if (this.y + this.altura >= canvas.height) {

            // Posiciona o peixe exatamente sobre o chão do canvas.
            this.y = canvas.height - this.altura;

            // Zera a velocidade vertical para impedir que o peixe continue caindo.
            this.velocidadeY = 0;

            // Indica que o peixe está apoiado no chão.
            this.estanochao = true;
        }

        // Controla os saltos aleatórios do peixe.
        if (this.estanochao) {

            // Aumenta o contador enquanto o peixe está apoiado no chão.
            this.contadorSalto++;

            // Verifica se o tempo de espera para o próximo salto terminou.
            if (this.contadorSalto >= this.intervaloSalto) {

                // Aplica a força do salto, fazendo o peixe subir.
                this.velocidadeY = this.forcaPulo;

                // Indica que o peixe saiu do chão.
                this.estanochao = false;

                // Reinicia o contador para começar a esperar pelo próximo salto.
                this.contadorSalto = 0;

                // Sorteia um novo intervalo de espera para o próximo salto.
                this.intervaloSalto =
                    this.gerarIntervaloSalto();
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