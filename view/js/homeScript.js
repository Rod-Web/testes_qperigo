// Importações de interações globais
import { btnEsperto } from "./interactions/global/rolagem-topo.js";
import { abrirBarraLateral } from "./interactions/global/barra_lateral.js";

// Importações principais
import { carregarDados } from "./functions/home/api.js";
import { configuracaoFiltro } from "./functions/home/filtro.js";
import { atualizarPagina } from "./functions/home/render.js";

// Central de Controle
document.addEventListener("DOMContentLoaded", async () => {
    await carregarDados();
    configuracaoFiltro(atualizarPagina);
    atualizarPagina();
    btnEsperto();
    abrirBarraLateral();
});
