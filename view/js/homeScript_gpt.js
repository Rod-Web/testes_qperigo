import { cardColumn } from "./components/cardColumn.js";
import { cardRow } from "./components/cardRow.js";

// ======= Configuração =======
const url = "https://backqperigo-production.up.railway.app/postagens";
let postagens = [];
let dataFiltrada = [];
let activeFilters = []; // Guarda apenas UM id de filtro agora

// ======= Inicialização =======
document.addEventListener("DOMContentLoaded", async () => {
  await carregarDados();
  configurarListenersDeFiltros();
  atualizarPagina();
});

// ======= Função de Fetch =======
async function carregarDados() {
  const localData = localStorage.getItem("postagens");

  if (localData) {
    postagens = JSON.parse(localData);
    console.log("Dados carregados do localStorage.");
    console.log(postagens)
  } else {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
      const data = await response.json();

      postagens = data.map((item) => ({
        id_postagem: item.id_postagem,
        nome_produto: item.nome_produto,
        composicao: item.composicao,
        manipulacao: item.manipulacao,
        combinacoes_perigosas: item.combinacoes_perigosas,
        introducao: item.introducao,
        data_publicacao: item.data_publicacao || new Date().toISOString().split("T")[0],
        id_categoria: item.id_categoria,
        id_comodo: item.id_comodo,
        banner: item.banner,
        acessos: item.acessos,
        armazenamento: item.armazenamento,
      }));

      localStorage.setItem("postagens", JSON.stringify(postagens));
      console.log("Dados buscados da API e salvos no localStorage.");
      console.log(postagens)
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Erro ao carregar dados da API.");
    }
  }
}

// ======= Função de Filtro =======
function aplicarFiltros() {
  if (activeFilters.length === 0) {
    dataFiltrada = [...postagens];
  } else {
    dataFiltrada = postagens.filter((item) => activeFilters.includes(item.id_comodo));
  }
}

// ======= Atualiza a Página =======
function atualizarPagina() {
  aplicarFiltros();
  renderizarNoticiasRecentes();
  renderizarNoticiasEmDestaque();
}

// ======= Configura Filtros=======
function configurarListenersDeFiltros() {
  const botoesDeFiltro = document.querySelectorAll(".room");

  botoesDeFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      const idDoComodo = parseInt(botao.id);
      // verifica todas as classes dentro dos botao e verifica se tem active se tiver volta true
      const estaAtivo = botao.classList.contains("active");

      // Desativa todos os filtros antes de aplicar
      botoesDeFiltro.forEach((b) => b.classList.remove("active"));
      activeFilters = []; // Reseta os filtros aplicados

      if (!estaAtivo) {
        botao.classList.add("active");
        activeFilters.push(idDoComodo);
      } else {
        botao.classList.remove("active")
      }

      atualizarPagina();
    });
  });
}

// ======= Renderiza Notícias Recentes (Coluna) =======
function renderizarNoticiasRecentes() {
  const container = document.querySelector(".cards-base-home-column");
  container.innerHTML = "";

  const recentes = [...dataFiltrada]
  //  O new Date(b.data_publicacao) transforma a string de data em objeto de data pra comparação.
    .sort((a, b) => new Date(b.data_publicacao) - new Date(a.data_publicacao))
    .slice(0, 4);

  if (recentes.length === 0) {
    container.innerHTML = "<p>Nenhuma postagem encontrada.</p>";
    return;
  }

  recentes.forEach((item) => {
    const card = criarCardComListener(cardColumn(item), item.id_postagem);
    container.appendChild(card);
  });
}

// ======= Renderiza Notícias em Destaque (Row com Paginação) =======
function renderizarNoticiasEmDestaque() {
  const container = document.querySelector(".cards-base-home-row");
  const prevBtn = document.getElementById("prev-page");
  const nextBtn = document.getElementById("next-page");
  const pageNumber = document.querySelector(".number");

  container.innerHTML = "";

  const destaque = [...dataFiltrada]
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

// ======= Função Helper: Card com Listener de Clique =======
function criarCardComListener(card, id) {
  card.addEventListener("click", () => {
    window.location.href = `https://front-qperigo.vercel.app/view/conteudo.html?id=${id}`;
  });
  return card;
}
