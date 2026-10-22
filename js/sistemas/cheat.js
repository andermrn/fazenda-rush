let teclaT_Apertada = false;

window.addEventListener("keydown", (e) => {
    if ( e.code === "KeyT" ) teclaT_Apertada = true;

    // Só vale se o jogo estiver rodando
    if ( teclaT_Apertada === false || jogoRodando === false ) return;
    

    if ( e.code === "Digit1" ) {
        iniciarFase(1);
    } else if ( e.code === "Digit2" ) {
        iniciarFase(2);
    } else if ( e.code === "Digit3" ) {
        iniciarFase(3);
    } else if ( e.code === "KeyV" ) {
        if( VIDA_INFINITA === true ) {
            VIDA_INFINITA = false;
            alert("[CHEAT] Vida infinita: OFF");
        } else {
            VIDA_INFINITA = true;
            alert("[CHEAT] Vida infinita: ON");
        }
    }
});

window.addEventListener("keyup", (e) => {
    if (e.code === "KeyT") teclaT_Apertada = false;
});