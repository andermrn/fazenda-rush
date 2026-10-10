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
    let distancia = Math.abs(this.x - jogador.posicaoX);// detecta o jogador
    if(distancia <=150){
        console.log("Jogador detectado!!!");
    
    if (this.x < jogador.posicaoX){
        this.direcao = 1;
    } else {
        this.direcao = -1
    }
} else {
  
    if(this.x + this.largura >= canvas.width){
        this.direcao = -1;
    }
    // inverte a direção ao atingir o limite esquerdo
    if(this.x <= 0){ 
        this.direcao = 1;
    } 
}
    this.y = canvas.height - this.altura;
    //movimenta o inimigo conforme sua velocidade e direção
    this.x += this.velocidade * this.direcao;
    this.x = Math.max(0,Math.min(this.x,canvas.width - this.largura));
}
}
//cria um objeto da classe inimigo
let inimigo = new Inimigo();