const canvas = document.getElementById("canvas");

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);
const plataforma1 = new plataforma(650,550,400,100,"assets/cenarios/plataforma.png")
const plataforma2 = new plataforma(40,550,400,100,"assets/cenarios/plataforma.png")
const plataforma3 = new plataforma(1300,550,400,100,"assets/cenarios/plataforma.png")
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    jogador.update();
    jogador.draw();
    inimigo.atualizar();
    inimigo.draw();
    plataforma1.draw();
    plataforma2.draw();
    plataforma3.draw();
}
animate();