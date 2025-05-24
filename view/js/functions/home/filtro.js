import { postagens } from './api.js';

export let postagensFiltradas = [];
export let valorFiltro = [];

export function configuracaoFiltro(atualizarPagina) {
    const botoes = document.querySelectorAll(".room");
    botoes.forEach((btn) => {
        btn.addEventListener("click", () => {
            const botaoId = parseInt(btn.id);
            const botaoAtiv = btn.classList.contains("active");

            botoes.forEach((b) => b.classList.remove("active"));
            valorFiltro = [];

            if (!botaoAtiv) {
                btn.classList.add("active");
                valorFiltro.push(botaoId);
            }

            atualizarPagina();
        });
    });
}

export function aplicarFiltro() {
    if (valorFiltro.length === 0) {
        postagensFiltradas = [...postagens];
    } else {
        postagensFiltradas = postagens.filter((item) =>
            valorFiltro.includes(item.id_comodo)
        );
    }
}

export function configurarToggleFiltro() {
    const filtroIcon = document.getElementById("filtro-icon");
    const filterOptionsDiv = document.getElementById("opcoes-filtro");

    filtroIcon.addEventListener("click", () => {
        filterOptionsDiv.classList.toggle("show");
    });
}
