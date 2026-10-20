class Bodao {
    constructor() {
        this.x = 500;
        this.y = 400;
        this.largura = 100;
        this.altura = 100;
        this.cor = "brown";
        // Define a vida inicial e o estado do chefe.
        this.vida = 10;
        this.morto = false;
    }
    movimento() {
    if (this.morto) return;

    this.y = canvas.height - this.altura;
}

    draw() {
        // Impede a movimentação após a derrota.
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
    // Volta para posição, a vida e o estado do chefe para uma nova partida.
    this.x = 500;
    this.y = canvas.height - this.altura;

    this.vida = 10;
    this.morto = false;
    }
}
