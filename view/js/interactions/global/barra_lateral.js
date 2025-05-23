
export function doContra() {
    const barraLateral = document.getElementById("barra-lateral");
    const ocultarFora = document.getElementById("ocultar-fora");

    barraLateral.classList.toggle("show-barra-lateral");
    ocultarFora.classList.toggle("show-ocultar-fora"); // .toggle se tiver class tira se não tiver coloca
}

// evento do click e ative da função
export function abrirBarraLateral() {
    const btnMenu = document.querySelector(".div-menu");
    const btnFechar = document.querySelector(".fechar-botao");
    const ocultarFora = document.getElementById("ocultar-fora");

    btnMenu.addEventListener("click", doContra);
    btnFechar.addEventListener("click", doContra);
    ocultarFora.addEventListener("click", doContra);
}
