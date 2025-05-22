import { cardRow } from "../../../components/cardRow.js";

const baseSearchNews = document.querySelector(".result-search");
const alertSearch = document.querySelector(".alertSearch");
const btnFilter = document.querySelectorAll("button");

let activeFilters = [];
let postagens = [];

// Função para filtrar postagens com base na palavra-chave e nos filtros ativos
function filterPosts(data, keyword, activeFilters) {
  return data.filter((item) => {
    const searchStr =
      `${item.nome_produto} ${item.introducao} ${item.composicao} ${item.combinacoes_perigosas} ${item.manipulacao}`.toLowerCase();
    const matchesKeyword = searchStr.includes(keyword.toLowerCase());

    // Verifica se o filtro está ativo e se o id_comodo da postagem corresponde aos filtros ativos
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(item.id_comodo);

    return matchesKeyword && matchesFilter;
  });
}

// Função para obter as postagens do localStorage
function getPostsFromLocalStorage() {
  const storedPosts = localStorage.getItem("postagens");
  return storedPosts ? JSON.parse(storedPosts) : []; // Retorna as postagens ou um array vazio se não houver dados
}

// Função para buscar e filtrar postagens
function fetchAndFilterPosts(keyword) {
  const data = getPostsFromLocalStorage();
  const filteredPosts = filterPosts(data, keyword, activeFilters);

  if (filteredPosts.length === 0) {
    alertSearch.style.display = "block";
    baseSearchNews.innerHTML = "";
  } else {
    alertSearch.style.display = "none";

    postagens = filteredPosts.map((postagem) => ({
      id_postagem: postagem.id_postagem,
      nome_produto: postagem.nome_produto,
      introducao: postagem.introducao,
      descricao: postagem.descricao,
      data_publicacao:
        postagem.data_publicacao || new Date().toISOString().split("T")[0],
      id_categoria: postagem.id_categoria,
      banner: postagem.banner,
      acessos: postagem.acessos,
    }));

    renderSearchNews();
    setupCardClickHandlers();
  }
}

// Função para extrair a keyword da URL e definir como valor no input
function setKeywordFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("query"); // Extrai a keyword da URL

  const searchInput = document.querySelector(".search-input-page");
  if (keyword) {
    searchInput.value = keyword;
    fetchAndFilterPosts(keyword);
  } else {
    console.error("Nenhuma keyword encontrada na URL.");
  }
}

// Inicializa o input com a keyword da URL quando a página carregar
document.addEventListener("DOMContentLoaded", setKeywordFromUrl);

// Adiciona um listener para a barra de pesquisa
const searchInput = document.querySelector(".search-input-page");
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const keyword = searchInput.value.trim();
    if (keyword) {
      fetchAndFilterPosts(keyword);
    } else {
      console.error("Por favor, insira uma palavra-chave para buscar.");
    }
  }
});

function renderSearchNews() {
  baseSearchNews.innerHTML = "";
  let currentIndex = 0;
  const itemsPerPage = 6;
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumber = document.querySelector(".number");

  let SearchNews = postagens.sort((a, b) => b.acessos - a.acessos).slice(0, 18);

  // Número total de páginas necessárias para exibir todas as notícias
  const totalPages = Math.ceil(SearchNews.length / itemsPerPage);

  function renderCards(startIndex) {
    baseSearchNews.innerHTML = "";
    const endIndex = Math.min(startIndex + itemsPerPage, SearchNews.length);
    for (let i = startIndex; i < endIndex; i++) {
      baseSearchNews.appendChild(cardRow(SearchNews[i]));
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
    if (currentIndex + itemsPerPage < SearchNews.length) {
      currentIndex += itemsPerPage;
      renderCards(currentIndex);
    }
  });

  renderCards(currentIndex);
}

// Listener para os botões de filtro de comodos
btnFilter.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filterId = parseInt(btn.id);
    console.log("Filtro", filterId);

    if (btn.classList.contains("active")) {
      btn.style.backgroundColor = "white";
      btn.style.borderColor = "rgb(194, 194, 194)";
      btn.classList.remove("active");

      // Remover o ID da lista de filtros ativos
      activeFilters = activeFilters.filter((id) => id !== filterId);
    } else {
      btn.style.backgroundColor = "#8ff39b";
      btn.style.borderColor = "#00cd18";
      btn.classList.add("active");

      // Adicionar o ID à lista de filtros ativos
      activeFilters.push(filterId);
    }

    // Refazer a busca com base nos filtros ativos e na palavra-chave
    const keyword = searchInput.value.trim();
    fetchAndFilterPosts(keyword);
  });
});

function setupCardClickHandlers() {
  const ArrayCards = document.querySelectorAll(".result-search");
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
