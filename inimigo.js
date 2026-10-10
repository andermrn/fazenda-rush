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
    ctx.fillStyle = "green";
    ctx.fillRect(this.x,this.y,this.largura,this.altura);
}
//atualiza a posição e controla a direção do inimigo
atualizar(){
    // inverte a direção ao atingir o limite direito
    if(this.x + this.largura >= 600){
        this.direcao = -1;
    }
    // inverte a direção ao atingir o limite esquerdo
    if(this.x <=100){ 
        this.direcao = 1;
    }
    //movimenta o inimigo conforme sua velocidade e direção
    this.x += this.velocidade * this.direcao;
}
}
//cria um objeto da classe inimigo
let inimigo = new Inimigo();