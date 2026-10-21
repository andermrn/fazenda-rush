// Altura fixa do canvas do jogo, em pixels
const ALTURA_MUNDO = 900;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Mantém a altura fixa e deixa a largura acompanhar o formato da janela
function ajustarCanvas() {
    canvas.width = Math.round(ALTURA_MUNDO * window.innerWidth / window.innerHeight);
    canvas.height = ALTURA_MUNDO;
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas); // Para escutar e detectar quando o usuário redimensiona a janela do navegador