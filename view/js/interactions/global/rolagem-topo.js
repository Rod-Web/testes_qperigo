// Função para rolar até o topo
export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função que ativa o botão de voltar ao topo
export function btnEsperto() {
    const button = document.querySelector(".voltar-topo");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            button.classList.add("aparecer");
        } else {
            button.classList.remove("aparecer");
        }
    });
     

    // Clique no botão faz rolar pro topo
    button.addEventListener("click", scrollToTop);
}
