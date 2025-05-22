function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  sidebar.classList.toggle("show-sidebar");
  overlay.classList.toggle("show-sidebar");
}

function searchInteration() {
  const body = document.querySelector("body");

  //SEARCH
  const searchInput = document.getElementById("search-input");
  const searchIcon = document.querySelector(".search-icon");

  searchInput.value = '';

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      const searchURL = `https://front-qperigo.vercel.app/view/pesquisa.html?query=${encodeURIComponent(query)}`;
      window.location.href = searchURL;
    }
  };

  // Event listener para pressionar a tecla Enter
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  // Event listener para clique no ícone de pesquisa
  searchIcon.addEventListener("click", handleSearch);
}

searchInteration()
