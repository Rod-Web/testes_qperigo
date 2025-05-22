import { cardColumn } from "./components/cardColumn.js";
import { cardRow } from "./components/cardRow.js";

// Variáveis
let postagens = [];
let dataAtual;
let activeFilters = []; // Declare a variável antes de usá-la

// Função para buscar as postagens
function fetchHome() {
  const storedPostagens = localStorage.getItem("postagens");

  if (storedPostagens) {
    // Se os dados estão no localStorage, parse o JSON para utilizá-los
    const data = JSON.parse(storedPostagens);
    
    if (activeFilters.length !== 0) {
      dataAtual = data.filter((item) => 
        activeFilters.includes(item.id_comodo) && item.id_categoria === idCategoria
      );
    } else {
      dataAtual = data.filter((item) => item.id_categoria === idCategoria);
    }

    postagens = dataAtual.map((postagem) => ({
      id_postagem: postagem.id_postagem, 
      nome_produto: postagem.nome_produto, 
      introducao: postagem.introducao, 
      data_publicacao: postagem.data_publicacao || new Date().toISOString().split("T")[0], 
      id_categoria: postagem.id_categoria, 
      banner: postagem.banner, 
      acessos: postagem.acessos, 
      armazenamento: postagem.armazenamento 
    }));

    renderLatestNews();
    renderEmphasisNews();
    setupCardClickHandlers();
  } else {
    console.error("Erro: Dados não encontrados no localStorage.");
  }
}

fetchHome();

// Manipulação dos filtros
const btnFilter = document.querySelectorAll(".room");

btnFilter.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filterId = parseInt(btn.id);

    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      activeFilters = activeFilters.filter((id) => id !== filterId);
    } else {
      btn.classList.add("active");
      activeFilters.push(filterId);
    }
    fetchHome();
  });
});

// Funções para renderizar as notícias
function renderLatestNews() {
  const baseLatestNews = document.querySelector(".cards-base-home-column");
  baseLatestNews.innerHTML = ''
  let latestNews = postagens
    .sort((a, b) => new Date(b.data_publicacao) - new Date(a.data_publicacao))
    .slice(0, 4);

  latestNews.forEach((data) => {
    let card = cardColumn(data);
    baseLatestNews.appendChild(card);
  });
}

function renderEmphasisNews() {
  const baseEmphasisNews = document.querySelector(".cards-base-home-row");
  baseEmphasisNews.innerHTML = ''
  let currentIndex = 0;
  const itemsPerPage = 6;
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumber = document.querySelector(".number");

  let emphasisNews = postagens
    .sort((a, b) => b.acessos - a.acessos)
    .slice(0, 18);

  // Número total de páginas necessárias para exibir todas as notícias
  const totalPages = Math.ceil(emphasisNews.length / itemsPerPage);

  function renderCards(startIndex) {
    baseEmphasisNews.innerHTML = "";
    const endIndex = Math.min(startIndex + itemsPerPage, emphasisNews.length);
    for (let i = startIndex; i < endIndex; i++) {
      baseEmphasisNews.appendChild(cardRow(emphasisNews[i]));
    }
    updatePageNumber();
  }

  function updatePageNumber() {
    const currentPage = Math.ceil((currentIndex + 1) / itemsPerPage);
    pageNumber.textContent = currentPage;
    prevPageBtn.style.color = currentPage > 1 ? "black" : "white";
    nextPageBtn.style.color = currentPage < totalPages ? "black" : "white";
  }

  prevPageBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= itemsPerPage;
      renderCards(currentIndex);
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentIndex + itemsPerPage < emphasisNews.length) {
      currentIndex += itemsPerPage;
      renderCards(currentIndex);
    }
  });

  renderCards(currentIndex);
}

// Função para manipular cliques nos cards
function setupCardClickHandlers() {
  const ArrayCards = document.querySelectorAll(".cards-base-home");
  const cardColumnTotality = [];

  ArrayCards.forEach((array) => {
    cardColumnTotality.push(...array.children);
  });

  cardColumnTotality.forEach((card) => {
    card.addEventListener("click", () => {
      window.location.href = `./conteudo.html?id=${card.id}`;
    });
  });
}
