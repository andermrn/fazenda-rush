class Inimigo {
    //atributos do inimigo
    x = 300;//posição horizontal
    y = 500;//posição vertical
    largura = 40;
    altura = 40;
    velocidade = 3;
    direcao = 1;

// desenha o inimigo no canvas
draw(){
    ctx.fillStyle = "green";//define a cor do retangulo
    ctx.fillRect(this.x,this.y,this.largura,this.altura);//desenha o retangulo
}
//atualiza a posição e controla a direção do inimigo
atualizar(){ //faz se mover, patrulhar e perseguir
    let distancia;//diz qual a distancia entra as bordas do inimigo e do jogador
    let distanciaEsquerda = jogador.posicaoX - (this.x + this.largura);// calcula a distãncia entre a borda direita do inimigo e a borda esquerda do jogador
    let distanciaDireita = this.x - (jogador.posicaoX + jogador.width);// calcula os limites da borda direita do jogador e a borda esquerda do inimigo
    if(this.x + this.largura < jogador.posicaoX){// verifica se o inimigo está a esquerda do jogador
        distancia = distanciaEsquerda;
    } else if(this.x > jogador.posicaoX + jogador.width){// verfica se o inimigo está a direita do jogador
        distancia = distanciaDireita;
    } else {
        distancia = 0//inimigo está encostando ou sobrepondo o jogador
    }
    //perseguição
    if(distancia <=150){ //se a distancia entre o inimigo e o personagem for de até 150 pixels ele persegue
        console.log("Jogador detectado!!!");
        if (this.x < jogador.posicaoX){//define a direcao que o inimigo deve perseguir
            this.direcao = 1;
        } else {
            this.direcao = -1
        }
        if(this.direcao == 1 && this.x + this.largura < jogador.posicaoX){ //move o inimigo até enconstar no jogador
            this.x += this.velocidade * this.direcao;
        } if(this.direcao == -1 && this.x > jogador.posicaoX + jogador.width){
           this.x += this.velocidade * this.direcao;  
        }
    
    } else {
  //caso o inimigo esteja a mais de 150 pixels de distancia do jogador, o inimigo continua patrulhando
    if(this.x + this.largura >= canvas.width){
        this.direcao = -1;
    }
    // inverte a direção ao atingir o limite esquerdo
    if(this.x <= 0){ 
        this.direcao = 1;
    } 
    this.x += this.velocidade * this.direcao;
}
    // faz ele sempre estar no "chão"
    this.y = canvas.height - this.altura;
    //impede que o inimigo ultrapasse os limites x do canvas
    this.x = Math.max(0,Math.min(this.x,canvas.width - this.largura));
}
}
//cria um objeto da classe inimigo
let inimigo = new Inimigo();