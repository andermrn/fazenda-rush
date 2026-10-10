function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    jogador.update();
    jogador.draw();
    inimigo.atualizar();
    inimigo.draw();
}
animate();