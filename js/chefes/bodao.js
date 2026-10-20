class Bodao {
    constructor() {
        this.x = 500;
        this.y = 400;
        this.largura = 100;
        this.altura = 100;
        this.cor = "brown";
    }
    movimento() {
    this.y = canvas.height - this.altura;
}

    draw() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(
            this.x,
            this.y,
            this.largura,
            this.altura
        );
    }
   
}