const imagemCarpa = new Image();
imagemCarpa.src = "assets/sprites/fase3/carpa.png";

// 256 x 176
const larguraFrameCarpa = 256;
const alturaFrameCarpa = 176;


const imagemCarpaVertical = new Image();
imagemCarpaVertical.src = "assets/sprites/fase3/carpa-vertical.png";

// 176 x 256
const larguraFrameCarpaVertical = 176;
const alturaFrameCarpaVertical = 256;



const colunasCarpa = 8;
const intervaloFrameCarpa = 6;  
const escalaCarpa = 0.8; // 1.0 = tamanho default (256 x 176)

const alcanceXCarpa = 150;        // distância horizontal em que ela percebe o jogador em cima
const velocidadeSubidaCarpa = 12; // pixels por quadro na subida
const velocidadeDescidaCarpa = 5; // pixels por quadro na descida

class Carpa {
    constructor() {

        // Largura da carpa DEITADA 
        this.larguraNormal = larguraFrameCarpa * escalaCarpa;
        this.alturaNormal = alturaFrameCarpa * escalaCarpa;

        // Tamanho da carpa em PE
        this.larguraEmPe = larguraFrameCarpaVertical * escalaCarpa;
        this.alturaEmPe = alturaFrameCarpaVertical * escalaCarpa;

        // Largura do peixe sem a escala
        this.largura = this.larguraNormal;
        this.altura = this.alturaNormal;

        // Começa colada na borda direita da tela
        this.x = canvas.width - this.largura;
        this.y = 400;

        this.vida = 10;
        this.morto = false;

        // Velocidade da patrulha (pixels por quadro)
        this.velocidade = 4;

        // Estado por ser tres: patrulhando, subindo ou descendo
        this.estado = "patrulhando";

        // Nasce na direita, então já vai para a esquerda (linha 0 = anda esquerda)
        this.direcao = -1;
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
    }

    // Troca de estado e recomeça a animação do primeiro quadro
    mudarEstado(novoEstado) {
        this.estado = novoEstado;
        this.frameX = 0;
        this.gameFrame = 0;
    }

    
    // Tive a brilhante ideia de deixar o peixe verticalmente quando ele for pular
    ficarVertical() {
        const centroX = this.x + this.largura / 2;

        this.largura = this.larguraEmPe;
        this.altura = this.alturaEmPe;

        this.x = centroX - this.largura / 2;
        this.y = canvas.height - this.altura;
    }

    // Caixa deitada de novo, com a base no chão
    ficarHorizontal() {
        const centroX = this.x + this.largura / 2;

        this.largura = this.larguraNormal;
        this.altura = this.alturaNormal;

        this.x = centroX - this.largura / 2;
        this.y = canvas.height - this.altura;

        // Não deixa ficar com um pedaço para fora da tela
        // Coloquei mais pra evitar bugs mesmo, vai que
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > canvas.width - this.largura) {
            this.x = canvas.width - this.largura;
        }
    }

    atualizar() {
        if (this.morto) return;

        if ( this.estado === "patrulhando" ) {
            this.patrulhar();
        } else if ( this.estado === "subindo" ) {
            this.subir();
        } else if ( this.estado === "descendo" ) this.descer();
    }

    // Nada no chão de um lado para o outro e procura o jogador em cima
    patrulhar() {

        // Sempre com a base no chão
        this.y = canvas.height - this.altura;

        // Distância horizontal entre o centro dela e o centro do jogador
        const centroCarpa = this.x + this.largura / 2;
        const centroJogador = jogador.posicaoX + jogador.width / 2;

        const distanciaX = Math.abs( centroJogador - centroCarpa );

        // Verificando se a BASE do jogador está acima do topo da Carpa
        const jogadorEmCima = jogador.posicaoY + jogador.height < this.y;

        if ( distanciaX <= alcanceXCarpa && jogadorEmCima ) { // Verificando aqui se ele ta vendo o player
            // Vira para o lado do jogador antes de pular
            if ( centroJogador < centroCarpa ) { // jogador ta na esquerda
                this.direcao = -1;
            } else this.direcao = 1; // jogador ta na direita

            this.ficarVertical();

            this.mudarEstado("subindo");
            return;
        }

        // Caminhando e Cantando
        this.x = this.x + this.velocidade * this.direcao;

        // Ao encostar na borda da tela, vira para o outro lado, SIMPLES!
        const limiteDireito = canvas.width - this.largura;

        if ( this.x <= 0 ) { // chegou no extremo esquerdo
            this.x = 0;
            this.direcao = 1;
        } else if ( this.x >= limiteDireito ) { // chegou a extrema direita
            this.x = limiteDireito;
            this.direcao = -1;
        }
    }

    // Sobe reta até bater no teto da tela
    subir() {
        this.y = this.y - velocidadeSubidaCarpa;

        if ( this.y <= 0 ) {
            this.y = 0;
            this.mudarEstado("descendo");
        }
    }

    // Desce reta até voltar ao chão
    descer() {
        this.y = this.y + velocidadeDescidaCarpa;

        const chao = canvas.height - this.altura;

        if ( this.y >= chao ) {
            this.ficarHorizontal();
            this.mudarEstado("patrulhando");
        }
    }

    draw() {
        if ( this.morto ) return;

        // Por padrão usa a Carpa deitada
        let imagem = imagemCarpa;
        let larguraFrame = larguraFrameCarpa;
        let alturaFrame = alturaFrameCarpa;

        if ( this.estado === "patrulhando" ) {
            if ( this.direcao === -1 ) {
                this.frameY = 0;   // anda para a esquerda
            } else this.frameY = 1;   // anda para a direita
        } else {
            // No ar usa a imagem da Carpa em pé
            imagem = imagemCarpaVertical;
            larguraFrame = larguraFrameCarpaVertical;
            alturaFrame = alturaFrameCarpaVertical;

            if ( this.estado === "subindo" ) {
                if ( this.direcao === -1 ) {
                    this.frameY = 0;   // subindo, olhando para a esquerda
                } else this.frameY = 1;   // subindo, olhando para a direita
            } else {
                if ( this.direcao === -1 ) {
                    this.frameY = 2;   // descendo, olhando para a esquerda
                } else this.frameY = 3;   // descendo, olhando para a direita
            }
        }

        // Só desenha depois que a imagem carregou
        if ( imagem.complete && imagem.naturalWidth > 0 ) {
            ctx.drawImage(
                imagem,
                this.frameX * larguraFrame, // recorte: x
                this.frameY * alturaFrame, // recorte: y
                larguraFrame, // recorte: largura
                alturaFrame, // recorte: altura
                this.x, // destino no canvas: x
                this.y, // destino no canvas: y
                this.largura, // tamanho final: largura
                this.altura // tamanho final: altura
            );
        }

        // Troca de quadro a cada "intervaloFrameCarpa" chamadas
        if (this.gameFrame % intervaloFrameCarpa === 0) {
            this.frameX += 1;

            if (this.frameX >= colunasCarpa) {
                this.frameX = 0;
            }
        }

        this.gameFrame++;
    }

    reiniciar() {
        // Volta ao tamanho deitado
        this.largura = this.larguraNormal;
        this.altura = this.alturaNormal;

        this.x = canvas.width - this.largura;
        this.y = canvas.height - this.altura;

        this.vida = 10;
        this.morto = false;

        this.estado = "patrulhando";
        this.direcao = -1;
        this.frameX = 0;
        this.gameFrame = 0;
    }
}