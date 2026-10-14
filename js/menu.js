// Cria uma função anônima e a executa imediatamente.
// Isso cria um escopo próprio para as variáveis e funções deste arquivo,
// evitando que suas declarações sejam expostas no escopo global.
// Também ajuda a evitar conflitos de nomes com outros scripts,
// como jogador.js, inimigo.js e jogo.js.

(() => {
    const telaMenu = document.getElementById("tela-menu");
    const telaSelecao = document.getElementById("tela-selecao");
    const telaJogo = document.getElementById("tela-jogo");

    const btnJogar = document.getElementById("btn-jogar");
    const btnSair = document.getElementById("btn-sair");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const btnVoltar = document.getElementById("btn-voltar");

    const botoesPersonagens = document.querySelectorAll(".personagem");
    const textoPersonagem = document.getElementById("personagem-selecionado");
    const musicaMenu = document.getElementById("musica-menu");

    let personagemEscolhido = null;

    function mostrarTela(tela) {
        telaMenu.hidden = tela !== telaMenu;
        telaSelecao.hidden = tela !== telaSelecao;
        telaJogo.hidden = tela !== telaJogo;
    }

    function iniciarMusica() {
        if (!musicaMenu) {
            return;
        }

        musicaMenu.play().catch(() => {
            console.log("A reprodução da música foi bloqueada pelo navegador.");
        });
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
        if (!personagemEscolhido) {
            return;
        }

        telaJogo.dataset.personagem = personagemEscolhido;

        mostrarTela(telaJogo);

        console.log("Personagem escolhido:", personagemEscolhido);
    }

    function voltarAoMenu() {
        personagemEscolhido = null;

        textoPersonagem.textContent =
            "Nenhum personagem selecionado.";

        btnConfirmar.disabled = true;

        botoesPersonagens.forEach((botao) => {
            botao.classList.remove("selecionado");
        });

        mostrarTela(telaMenu);
    }

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

    btnSair.addEventListener("click", () => {
        window.close();

        setTimeout(() => {
            if (!window.closed) {
                alert("Para sair do jogo, feche esta aba do navegador.");
            }
        }, 100);
    });
})();