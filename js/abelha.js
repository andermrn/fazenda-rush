class Abelha{
    constructor(){
        this.x = 600;
        this.y = 200;
        this.velocidade = 2;
        this.direcaoX = 1;
        this.direcaoY = 1;
        this.altura = 30;
        this.largura = 30;
        }
        mover(){
            if(this.x + this.largura >= canvas.width){
                this.direcaoX = -1;
            }
            if (this.x <= 0){
                this.direcaoX = 1;
            }
            if(this.y <= 440){
                this.direcaoY = 1;
            }
            if(this.y + this.altura >= canvas.height - 40 ){
                this.direcaoY = -1;
            }
            this.x += this.velocidade * this.direcaoX;
            this.y += this.velocidade * this.direcaoY;
        }
        draw(){
            ctx.fillStyle = "green";
            ctx.fillRect(this.x,this.y,this.largura,this.altura);
        }
}
const abelha1 = new Abelha();