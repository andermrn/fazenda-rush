const telaMenu = document.getElementById("tela-menu");
const telaSelecao = document.getElementById("tela-selecao");
const telaJogo = document.getElementById("tela-jogo");

const btnJogar = document.getElementById("btn-jogar");
const btnSair = document.getElementById("btn-sair");
const btnConfirmar = document.getElementById("btn-confirmar");
const btnVoltar = document.getElementById("btn-voltar");

const botoesPersonagens = document.querySelectorAll(".personagem");
const textoPersonagem = document.getElementById("personagem-selecionado");
const mensagemInicio = document.getElementById("mensagem-inicio");

let personagemEscolhido = null;

// Abre a seleção de personagens
btnJogar.addEventListener("click", function () {
    telaMenu.hidden = true;
    telaSelecao.hidden = false;
});

// Seleciona um personagem
botoesPersonagens.forEach(function (botao) {
    botao.addEventListener("click", function () {
        personagemEscolhido = botao.dataset.personagem;

        textoPersonagem.textContent = "Personagem selecionado: " + personagemEscolhido;
        btnConfirmar.disabled = false;

        botoesPersonagens.forEach(function (outroBotao) {
            outroBotao.classList.remove("selecionado");
        });

        botao.classList.add("selecionado");
    });
});

// Volta ao menu inicial
btnVoltar.addEventListener("click", function () {
    telaSelecao.hidden = true;
    telaMenu.hidden = false;
});

// Confirma o personagem e abre a tela do jogo
btnConfirmar.addEventListener("click", function () {
    if (personagemEscolhido === null) {
        return;
    }

    telaSelecao.hidden = true;
    telaJogo.hidden = false;

    mensagemInicio.textContent = "Personagem escolhido: " + personagemEscolhido;

    console.log("Personagem escolhido:", personagemEscolhido);

    // A inicialização real do jogo será integrada posteriormente.
});

// Botão Sair
btnSair.addEventListener("click", function () {
    window.close();
});