const canvas = document.getElementById("canvas");

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

const ctx = canvas.getContext("2d");

let andandoesquerda = false;
let andandodireita = false;
const GRAVIDADE = 0.6;

class Player{ 
    width = 30;
    height = 60;
    posicaoX = 100;
    posicaoY = 700 - this.height;
    color = "red";
    velocidadeX = 0;
    velocidadeY = 0;
    forcadopulo = -15;
    estanochao = true;
    velocidadeandar = 6;

draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posicaoX, this.posicaoY, this.width, this.height);
}

update(){

    this.velocidadeX =
        (andandodireita ? this.velocidadeandar : 0) -
        (andandoesquerda ? this.velocidadeandar : 0);
    this.posicaoX += this.velocidadeX;
    this.posicaoX = Math.max(0, Math.min(this.posicaoX, canvas.width - this.width));

    this.velocidadeY += GRAVIDADE;
    this.posicaoY += this.velocidadeY;
    this.estanochao = false;

    if (this.posicaoY + this.height >= canvas.height) {
        this.posicaoY = canvas.height - this.height;
        this.velocidadeY = 0;
        this.estanochao = true;
    }
}

pular() {
    if (this.estanochao) {
        this.velocidadeY = this.forcadopulo;
        this.estanochao = false;
    }
}
}

const jogador = new Player();


window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        jogador.pular();
    }

    if (e.key.toLowerCase() === "d") {
        andandodireita = true;
    }
    if (e.key.toLowerCase() === "a") {
        andandoesquerda = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() === "d") {
        andandodireita = false;
    }
    if (e.key.toLowerCase() === "a") {
        andandoesquerda = false;
    }
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = 700;
    jogador.posicaoX = Math.min(jogador.posicaoX, canvas.width - jogador.width);
});