import increment_view from "./increment_view.js";
import show_post from "./show_post.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (!id) {
    console.error('ID não encontrado na URL.');
    // Pode sair da execução aqui, se necessário
}

// Exibe o esqueleto de carregamento inicial
document.querySelectorAll('.skeleton').forEach(el => el.classList.add('active'));

// Função para obter as postagens do localStorage
function getPostsFromLocalStorage() {
    const storedPosts = localStorage.getItem('postagens');
    return storedPosts ? JSON.parse(storedPosts) : []; // Retorna as postagens ou um array vazio se não houver dados
}

// Obtemos os dados do localStorage
const postagens = getPostsFromLocalStorage();

const postagem = postagens.find(item => item.id_postagem == id);

if (!postagem) {
    console.error('Postagem não encontrada para o ID fornecido.');
    // Em vez de usar return aqui, apenas não faz nada ou exibe uma mensagem.
}

// Chama show_post após os dados estarem carregados
show_post(postagem);

// Incrementa a visualização
increment_view(id);

// Remove o esqueleto de carregamento após a atualização do conteúdo
document.querySelectorAll('.skeleton').forEach(el => el.classList.remove('active'));
