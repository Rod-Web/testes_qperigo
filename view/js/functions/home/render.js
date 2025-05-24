import { postagensFiltradas, aplicarFiltro, configurarToggleFiltro } from './filtro.js';
import { cardRow } from "../../components/format-cards-home/cardRow.js";

export function atualizarPagina() {
    aplicarFiltro();
    renderizarSecaoDestaque();
    configurarToggleFiltro();
}

export function renderizarSecaoDestaque() {
    const container = document.querySelector(".cards-home-row");
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    const pageNumber = document.querySelector(".number");

    container.innerHTML = "";

    const destaque = [...postagensFiltradas]
        .sort((a, b) => b.acessos - a.acessos)
        .slice(0, 18);

    const itemsPerPage = 6;
    let currentIndex = 0;
    const totalPages = Math.ceil(destaque.length / itemsPerPage);

    function renderPagina() {
        container.innerHTML = "";

        const pagina = destaque.slice(currentIndex, currentIndex + itemsPerPage);
        if (pagina.length === 0) {
            container.innerHTML = "<p>Nenhuma postagem encontrada.</p>";
        } else {
            pagina.forEach((item) => {
                const card = criarCardComListener(cardRow(item), item.id_postagem);
                container.appendChild(card);
            });
        }

        pageNumber.textContent = Math.ceil(currentIndex / itemsPerPage) + 1;
        prevBtn.style.color = currentIndex > 0 ? "black" : "white";
        nextBtn.style.color = currentIndex + itemsPerPage < destaque.length ? "black" : "white";
    }

    prevBtn.onclick = () => {
        if (currentIndex > 0) {
            currentIndex -= itemsPerPage;
            renderPagina();
        }
    };

    nextBtn.onclick = () => {
        if (currentIndex + itemsPerPage < destaque.length) {
            currentIndex += itemsPerPage;
            renderPagina();
        }
    };

    renderPagina();
}

function criarCardComListener(card, id) {
    card.addEventListener("click", () => {
        window.location.href = `/view/conteudo.html?id=${id}`;
    });
    return card;
}
