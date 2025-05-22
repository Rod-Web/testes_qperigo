// Função para rolar até o topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar o botão ao rolar a página
window.addEventListener("scroll", function () {
    const button = document.querySelector(".back-to-top");
    if (window.scrollY > 300) {
    button.classList.add("show");
    } else {
        button.classList.remove("show");
    }
});
