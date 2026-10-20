class Carpa {
    constructor() {
        this.x = 700;
        this.y = 400;
        this.largura = 100;
        this.altura = 100;
        this.cor = "blue";
    }

    mover() {
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