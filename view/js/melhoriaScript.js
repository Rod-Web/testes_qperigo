// Usado IA para entendimento com base no escorpo antigo, delegação de tarefas/modularização e utilização de códigos desconhecidos como async, await, entre outros.


import { cardColumn } from "./components/cardColumn.js";
import { cardRow } from "./components/cardRow.js";

// ======= Configuração =======
const url = "https://backqperigo-production.up.railway.app/postagens";
let postagens = [];
let filtroAtivado = [];
let dataAtual = []; // Database com filtro aplicado

// ======= Inicialização =======
document.addEventListener("DOMContentLoaded", async () => {
    await carregarDados();
    configurarEscutadorDosFiltros();
    atualizarPagina();
    
});

async function carregarDados(params) {
    const DadosNoLocal = localStorage.getItem("postagens");
    // Se os dados já foi carregado anteriormente já pega sem precisar fazer outra requisição
    if (DadosNoLocal) {
        postagens = JSON.parse(DadosNoLocal);
        console.log("Dados carregados do LocalStorage.")
    } else {
        // try...catch são uma maneira de tratar erro e evitar quebrar, se o código do try der erro executa o catch
        try {
            //
            //
            // o await é fundamental porque só pode continuar depois da resposta daqui
            // o fetch(url) é fazendo uma requisição API
            const response = await fetch(url)
        } catch (error) {
            
        }
    }
}

function configurarEscutadorDosFiltros(params) {
    
}

function atualizarPagina(params) {
    
}