function receberDados() {
    const localData = localStorage.getItem("postagens");
    if (localData) {
        const post = JSON.parse(localData);
        console.log(post);
        return post;
    } else {
        console.error("Erro: Dados não encontrados.");
        return [];
    }
}

function parametroUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
        console.log(id);
        return id;
    } else {
        console.error("Erro: Parâmetro 'id' não encontrado.");
        return null;
    }
}

function filtrar(dados, params) {
    const post_atual = dados.find(dado => dado.id_postagem == params);
    if (!post_atual) {
        console.error("Postagem não encontrada.");
    }
    return post_atual;
}

// Execução:
const dadosRecebidos = receberDados();
const parametroId = parametroUrl();

if (parametroId) {
    const postFiltrado = filtrar(dadosRecebidos, parametroId);
    if (postFiltrado) {
        atualizarHTML(postFiltrado);
    };
}

function atualizarHTML(postFiltrado) {
    document.title = postFiltrado.nome_produto;

    let BannerPost = document.querySelector('.img-produto');
    BannerPost.src = postFiltrado.banner;

        // Atualizar os elementos do DOM com os dados da notícia
    atualizarElemento('.titulo-principal', postFiltrado.nome_produto);
    atualizarElemento('.intro', postFiltrado.introducao);
    atualizarElemento('.conteudo-composicao', postFiltrado.composicao);
    atualizarElemento('.conteudo-combinacoes', postFiltrado.combinacoes_perigosas);
    atualizarElemento('.conteudo-manipulacao', postFiltrado.manipulacao);
    atualizarElemento('.conteudo-armazenamento', postFiltrado.armazenamento);

    atualizarElemento('.introTitulo',"Introdução:");
    atualizarElemento('.composicao',"Composição:");
    atualizarElemento('.combinacao',"Combinação:");
    atualizarElemento('.manipulacao',"Manipulação:");
    atualizarElemento('.armazenamento',"Armazenamento:");

}

function atualizarElemento(seletor, valor) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
        // Atualizar o conteúdo e remover a classe skeleton para desativar o efeito de carregamento
        elemento.innerHTML = valor;
        elemento.classList.remove('skeleton');
    }
}

// Remove o esqueleto de carregamento após a atualização do conteúdo
document.querySelectorAll('.skeleton').forEach(el => el.classList.remove('active'));
