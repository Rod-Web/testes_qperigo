
import { cardColumn } from "./components/cardColumn.js";
import { cardRow } from "./components/cardRow.js";

// URL da API para fetch
const url = "https://backqperigo-production.up.railway.app/postagens";
let postagens = [];
let activeFilters = [];
let dataAtual;

// Função para buscar os dados da API e salvar no localStorage
function fetchHome() {
  console.log(activeFilters);

  // Verifica se já temos os dados no localStorage
  const localStorageData = localStorage.getItem("postagens");
  if (localStorageData) {
    postagens = JSON.parse(localStorageData);
    // Aplica o filtro sempre que a página for carregada
    aplicarFiltro();
    renderLatestNews();
    renderEmphasisNews();
    setupCardClickHandlers();
  } else {
    // Fetch do JSON
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (activeFilters.length > 0 && activeFilters[0] != 0) {
          // Aplica o filtro imediatamente
          dataAtual = data.filter((item) => activeFilters.includes(item.id_comodo));
          console.log("Filtros ativos: ", activeFilters);
        } else {
          dataAtual = data;
          console.log("Sem filtros aplicados.");
        }

        postagens = dataAtual.map((postagem) => ({
          id_postagem: postagem.id_postagem,
          nome_produto: postagem.nome_produto,
          composicao: postagem.composicao,
          manipulacao: postagem.manipulacao,
          combinacoes_perigosas: postagem.combinacoes_perigosas,
          introducao: postagem.introducao,
          data_publicacao: postagem.data_publicacao || new Date().toISOString().split("T")[0],
          id_categoria: postagem.id_categoria,
          id_comodo: postagem.id_comodo,
          banner: postagem.banner,
          acessos: postagem.acessos,
          armazenamento: postagem.armazenamento,
        }));

        // Salva os dados no localStorage
        localStorage.setItem("postagens", JSON.stringify(postagens));

        // Aplica o filtro e renderiza
        aplicarFiltro();
        renderLatestNews();
        renderEmphasisNews();
        setupCardClickHandlers();
      })
      .catch((error) => {
        console.error("Erro: " + error);
      });
  }
}

// Função que aplica os filtros ativos nas postagens
function aplicarFiltro() {
  if (activeFilters.length > 0 && activeFilters[0] != 0) {
    dataAtual = postagens.filter((item) => activeFilters.includes(item.id_comodo));
  } else {
    dataAtual = postagens;
  }
}

// Carrega as postagens
fetchHome();

// Lógica para os botões de filtro
const btnFilter = document.querySelectorAll(".room");
console.log(btnFilter);

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

    // Atualiza os dados filtrados
    fetchHome();
  });
});

// Funções para renderizar as notícias
function renderLatestNews() {
  const baseLatestNews = document.querySelector(".cards-base-home-column");
  baseLatestNews.innerHTML = '';
  let latestNews = dataAtual
    .sort((a, b) => new Date(b.data_publicacao) - new Date(a.data_publicacao))
    .slice(0, 4);

  latestNews.forEach((data) => {
    let card = cardColumn(data);
    baseLatestNews.appendChild(card);
  });
}

function renderEmphasisNews() {
  const baseEmphasisNews = document.querySelector(".cards-base-home-row");
  baseEmphasisNews.innerHTML = '';
  let currentIndex = 0;
  const itemsPerPage = 6;
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumber = document.querySelector(".number");

  let emphasisNews = dataAtual
    .sort((a, b) => b.acessos - a.acessos)
    .slice(0, 18);

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
      window.location.href = `https://front-qperigo.vercel.app/view/conteudo.html?id=${card.id}`;
    });
  });
}
