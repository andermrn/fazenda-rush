const imagemBodao = new Image();
imagemBodao.src = "assets/sprites/fase1/bodao.png";

// 600 x 400
const larguraFrameBodao = 600;
const alturaFrameBodao = 400;

const colunasBodao = 6;
const intervaloFrameBodao = 8; // deixar a animacao mais lenta
const escalaBodao = 0.5;       // 1.0 = tamanho default do bodao (600 x 400)


const velocidadeDashBodao = 12;    // pixels por quadro durante o dash
const duracaoPreparoBodao = 60;    // quadros se abaixando (60 quadros = 1 segundo)
const duracaoDescansoBodao = 90;   // quadros parado depois do dash (90 quadros = 1,5 segundo)


// criei essa const aqui pra medir a distância (em pixels) em que ele percebe o player
const alcanceBodao = 800; 


class Bodao {
    constructor() {
        // ajustando para a escalaBodao escolhida por mim :)
        this.largura = larguraFrameBodao * escalaBodao;
        this.altura = alturaFrameBodao * escalaBodao;
        
        this.x = canvas.width - this.largura; // começa colada na borda
        this.y = 400;

        this.vida = 20;
        this.morto = false;
        
        // Velocidade da patrulha (pixels por quadro)
        this.velocidade = 2; // 2px

        // Estado: "patrulhando" ou "preparando" (se abaixando para o bote)
        this.estado = "patrulhando";
        this.contadorEstado = 0; // aqui vai contar quantos quadros ja se passaram no estado atual do bodao

        // Animação (linha 4 = patrulha esquerda, linha 5 = patrulha direita)
        this.direcao = 1; // -1 = esquerda | 1 = direita
        this.frameX = 0;
        this.frameY = 5;
        this.gameFrame = 0;

    }

    mudarEstado(novoEstado) {

        this.estado = novoEstado;
        this.contadorEstado = 0;
        this.frameX = 0;
        this.gameFrame = 0;

    }

    atualizar() {
        // Se tiver morto, obviamente n faz nada
        if ( this.morto )return;

        // POR ENQUANTO, fica so no chão
        this.y = canvas.height - this.altura;

        if ( this.estado === "patrulhando" ) {
            this.patrulhar();
        } else if ( this.estado === "preparando" ) {
            this.preparar();
        } else if ( this.estado === "correndo" ) {
            this.correr();
        } else if ( this.estado === "descansando" ) {
            this.descansar();
        }

    }

    // Andar para um lado e para o outro procurando o jogador
    patrulhar() {
        // Distância horizontal entre o centro do Bodão e o centro do jogador
        const centroBodao = this.x + this.largura / 2; // centro do bodao
        const centroJogador = jogador.posicaoX + jogador.width / 2; // centro do jogador
        const distancia = Math.abs(centroJogador - centroBodao); // Math.abs faz o modulo do valor, ou seja, tira o negativo
    
        // sempre verificando se o player esta na mesma altura do bode (Ou seja, no chão e não em cima de uma plataforma)
        const mesmaAltura = jogador.posicaoY + jogador.height > this.y; // Altura do jogador é maior que a altura do bode? True or False
    
        if ( distancia <= alcanceBodao && mesmaAltura ) { // Caso tenha achado o player no alcanceBodao escolhido
            // Vira para o jogador. Essa direção fica travada até o fim do dash.
            if (centroJogador < centroBodao) { // jogador ta na esquerda
                this.direcao = -1;
            } else { // jogador ta na direita
                this.direcao = 1;
            }

            this.mudarEstado("preparando");
            return;
        }

        // Anda na direção atual (1 = direita, -1 = esquerda)
        this.x = this.x + this.velocidade * this.direcao;

        // Borda direita da tela
        const limiteDireito = canvas.width - this.largura;

        if (this.x <= 0) { // Ao encostar na borda esquerda, vire para o outro lado
            this.x = 0;
            this.direcao = 1;
        } else if (this.x >= limiteDireito) { // ao encostar na borda direita, vire para o outro lado
            this.x = limiteDireito;
            this.direcao = -1;
        }

    }    

    // Fica agachado por um tempo e depois parte para o dash
    preparar() {
        this.contadorEstado += 1;

        if ( this.contadorEstado >= duracaoPreparoBodao ) {
            this.mudarEstado("correndo");
        }
    }

    // Corre na direção travada até encostar na borda da tela
    correr() {
        this.x = this.x + velocidadeDashBodao * this.direcao;

        const limiteDireito = canvas.width - this.largura;

        if (this.x <= 0) {
            this.x = 0;
            this.mudarEstado("descansando");
        } else if (this.x >= limiteDireito) {
            this.x = limiteDireito;
            this.mudarEstado("descansando");
        }
    }

    // Fica parado por um tempo e depois volta a patrulhar
    descansar() {
        this.contadorEstado += 1;

        if (this.contadorEstado >= duracaoDescansoBodao) {
            this.mudarEstado("patrulhando");
        }
    }

    draw() {
        if ( this.morto ) return;

        // Escolhe a linha pelo estado e pela direção
        if ( this.estado === "preparando" ) {
            if ( this.direcao === -1 ) {
                this.frameY = 0;   // prepara o bote para a esquerda
            } else this.frameY = 2;   // prepara o bote para a direita
        } else if ( this.estado === "correndo" ) {
            if (this.direcao === -1) {
                this.frameY = 1;   // dash para a esquerda
            } else this.frameY = 3;   // dash para a direita
        } else {

            // patrulhando e descansando usam as linhas de andar
            if (this.direcao === -1) {
                this.frameY = 4;
            } else this.frameY = 5;
        }

        // Só desenha depois que a imagem carregou
        if ( imagemBodao.complete && imagemBodao.naturalWidth > 0 ) {
            ctx.drawImage(
                imagemBodao,
                this.frameX * larguraFrameBodao,   
                this.frameY * alturaFrameBodao,    
                larguraFrameBodao,                 
                alturaFrameBodao,                  
                this.x,                            
                this.y,                            
                this.largura,                      
                this.altura                        
            );
        }

        // Troca de quadro a cada "intervaloFrameBodao" chamadas
        if ( this.gameFrame % intervaloFrameBodao ===  0) {
            if ( this.estado === "preparando" ) {
                // toca uma vez e fica no último quadro (agachado)
                if ( this.frameX < colunasBodao - 1 ) this.frameX = this.frameX + 1;
            } else if ( this.estado === "descansando" ) {
                // Descansando: fica no primeiro quadro, parado em pé
                this.frameX = 0;
            } else {
                // Patrulhando e correndo: repete a animação
                this.frameX += 1;

                if ( this.frameX >= colunasBodao ) {
                    this.frameX = 0;
                }
            }
        }

        this.gameFrame++;
    }

    reiniciar() {
        this.x = canvas.width - this.largura;
        this.y = canvas.height - this.altura;

        this.vida = 10;
        this.morto = false;

        this.direcao = 1;
        this.estado = "patrulhando";
        this.contadorEstado = 0;
        this.frameX = 0;
        this.gameFrame = 0;
    }
}