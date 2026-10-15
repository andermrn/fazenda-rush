const canvas = document.getElementById("canvas");

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);
const plataforma1 = new plataforma(550,400,300,40,"assets/cenarios/plataformac.png")
const plataforma2 = new plataforma(100,550,300,40,"assets/cenarios/plataformac.png")
const plataforma3 = new plataforma(1000,550,300,40,"assets/cenarios/plataformac.png")
const plataformas = [plataforma1, plataforma2, plataforma3];//cplt
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    jogador.update();
    jogador.draw();
    abelha1.mover();
    abelha1.draw();
    inimigo.atualizar();
    inimigo.draw();
    plataforma1.draw();
    plataforma2.draw();
    plataforma3.draw();

    atualizarProjeteis();
    verificarColisoes();
    desenharProjeteis();
}
animate();