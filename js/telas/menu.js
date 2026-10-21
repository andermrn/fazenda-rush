(() => {
    const telaMenu = document.getElementById("tela-menu");
    const telaSelecao = document.getElementById("tela-selecao");
    const telaJogo = document.getElementById("tela-jogo");

    const btnJogar = document.getElementById("btn-jogar");
    const btnSair = document.getElementById("btn-sair");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const btnVoltar = document.getElementById("btn-voltar");
    const btnMusica = document.getElementById("btn-musica");

    const botoesPersonagens = document.querySelectorAll(".personagem");
    const textoPersonagem = document.getElementById("personagem-selecionado");

    const musicaMenu = document.getElementById("musica-menu");
    const musicaGameplay = document.getElementById("musica-gameplay");

    let personagemEscolhido = null;

    function mostrarTela(tela) {
        telaMenu.hidden = tela !== telaMenu;
        telaSelecao.hidden = tela !== telaSelecao;
        telaJogo.hidden = tela !== telaJogo;
    }

    function iniciarMusica() {
        if (!musicaMenu || musicaMenu.muted) return;

        musicaMenu.play().catch(() => {
            console.log("A reprodução da música foi bloqueada pelo navegador.");
        });
    }

    function alternarMusica() {
        if (!musicaMenu || !musicaGameplay) return;

        const mutar = !musicaMenu.muted;

        musicaMenu.muted = mutar;
        musicaGameplay.muted = mutar;
    }

    function selecionarPersonagem(botao) {
        personagemEscolhido = botao.dataset.personagem;

        textoPersonagem.textContent =
            "Personagem selecionado: " + personagemEscolhido;

        btnConfirmar.disabled = false;

        botoesPersonagens.forEach((outroBotao) => {
            outroBotao.classList.toggle(
                "selecionado",
                outroBotao === botao
            );
        });
    }

    function confirmarPersonagem() {
        if (!personagemEscolhido) return;

        trocarPersonagem(personagemEscolhido);
        window.reiniciarPartida();

        telaJogo.dataset.personagem = personagemEscolhido;
        mostrarTela(telaJogo);

        musicaMenu.pause();
        musicaMenu.currentTime = 0;

        musicaGameplay.currentTime = 0;

        if (!musicaGameplay.muted) {
            musicaGameplay.play().catch(() => {
                console.log("Não foi possível iniciar a música da gameplay.");
            });
        }

        console.log("Personagem escolhido:", personagemEscolhido);
    }

    function voltarAoMenu() {
        personagemEscolhido = null;

        textoPersonagem.textContent = "Nenhum personagem selecionado.";
        btnConfirmar.disabled = true;

        botoesPersonagens.forEach((botao) => {
            botao.classList.remove("selecionado");
        });

        musicaGameplay.pause();
        musicaGameplay.currentTime = 0;

        mostrarTela(telaMenu);

        musicaMenu.currentTime = 0;

        if (!musicaMenu.muted) {
            musicaMenu.play().catch(() => {
                console.log("Não foi possível iniciar a música do menu.");
            });
        }
    }

    function voltarParaSelecao() {
        personagemEscolhido = null;

        textoPersonagem.textContent = "Nenhum personagem selecionado.";
        btnConfirmar.disabled = true;

        botoesPersonagens.forEach((botao) => {
            botao.classList.remove("selecionado");
        });

        musicaGameplay.pause();
        musicaGameplay.currentTime = 0;

        mostrarTela(telaSelecao);

        musicaMenu.currentTime = 0;

        if (!musicaMenu.muted) {
            musicaMenu.play().catch(() => {
                console.log("Não foi possível iniciar a música do menu.");
            });
        }
    }

    window.voltarParaSelecao = voltarParaSelecao;

    mostrarTela(telaMenu);

    btnJogar.addEventListener("click", () => {
        mostrarTela(telaSelecao);
        iniciarMusica();
    });

    botoesPersonagens.forEach((botao) => {
        botao.addEventListener("click", () => {
            selecionarPersonagem(botao);
        });
    });

    btnConfirmar.addEventListener("click", confirmarPersonagem);
    btnVoltar.addEventListener("click", voltarAoMenu);
    btnMusica.addEventListener("click", alternarMusica);

    btnSair.addEventListener("click", () => {
        window.close();

        setTimeout(() => {
            if (!window.closed) {
                alert("Para sair do jogo, feche esta aba do navegador.");
            }
        }, 100);
    });
})();