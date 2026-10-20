class Rainha {
    constructor() {
        this.x = 900;
        this.y = 400;
        this.largura = 100;
        this.altura = 100;
        this.cor = "brown";
        this.vida = 10;
        this.morto = false;
    }
    mover() {
        if (this.morto) return;
        this.y = canvas.height - this.altura;
    }

    draw() {
        if (this.morto) return;
        ctx.fillStyle = this.cor;
        ctx.fillRect(
            this.x,
            this.y,
            this.largura,
            this.altura
        );
    }
    reiniciar() {
        this.x = 900;
        this.y = canvas.height - this.altura;
        this.vida = 10;
        this.morto = false;
    }
}