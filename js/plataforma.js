class plataforma{
    constructor(x,y,largura,altura,imagem){
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.largura = largura;
        this.imagem = new Image()
        this.imagem.src = imagem;
        this.carregada = false;
        this.imagem.onload = () => {
            this.carregada = true;


        }





    }

        draw(){    
            
            if(this.carregada == true){

                ctx.drawImage(this.imagem,this.x,this.y,this.largura,this.altura)

                


            } else{
                
            ctx.fillStyle = "blue"

            ctx.fillRect(this.x,this.y,this.largura,this.altura);
            }
                








        }





}