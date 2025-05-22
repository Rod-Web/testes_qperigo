import { cardColumn } from "./components/cardColumn.js";
import { cardRow } from "./components/cardRow.js";

const url = "https://backqperigo-production.up.railway.app/postagens";
let postagens = [];
let postagensFiltradas = [];
let valorFiltro = [];

document.addEventListener("DOMContentLoaded", async ()=> {
    await carregarDados();
    configuracaoFiltro();
    atualizarPagina();
    renderizarCardsBase();

});

async function carregarDados() {
    const locaData = localStorage.getItem("postagens");
    if (locaData) {
        postagens = JSON.parse(locaData);
        console.log("Dados carregados do localStorage.");
    } else {
        try {
            const response = await fetch(url);
            if(!response.ok) throw new Error(`Erro na API: ${response.status}`);
            const data = await response.json();
            postagens = await data.map((postagem) => ({
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
            localStorage.setItem("postagens", JSON.stringify(postagens));
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            alert("Erro ao carregar dados da API.");
        };
    };
};

function configuracaoFiltro() {
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
    })});
};

function aplicarFiltro() {
    if (valorFiltro.length === 0) {
        postagensFiltradas = [...postagens];
    } else {
        postagensFiltradas = postagens.filter((item) => valorFiltro.includes(item.id_comodo));
    }
}

function atualizarPagina() {
    aplicarFiltro();
    renderizarNoticiasEmDestaque();
        configurarToggleFiltro();

}

//====== Visibilidade do filtro =======
function configurarToggleFiltro() {
    const filtroIcon = document.getElementById("filtro-icon")
    const filterOptionsDiv = document.getElementById("filter-options")

    filtroIcon.addEventListener("click", function mostrarToggle(){
        filterOptionsDiv.classList.toggle("show")
    })
}

// ======= Renderiza Notícias em Destaque (Row com Paginação) =======
function renderizarNoticiasEmDestaque() {
  const container = document.querySelector(".cards-base-home-row");
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

// ======= Função Helper: Card com Listener de Clique =======
function criarCardComListener(card, id) {
  card.addEventListener("click", () => {
    window.location.href = `https://front-qperigo.vercel.app/view/conteudo.html?id=${id}`;
  });
  return card;
}