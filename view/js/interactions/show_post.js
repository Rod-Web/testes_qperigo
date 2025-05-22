function show_post(post) {
    // Atualizar o título da página
    document.title = post.nome_produto;

    let BannerPost = document.querySelector('.banner-img');
    BannerPost.src = post.banner;

    // Atualizar os elementos do DOM com os dados da notícia
    atualizarElemento('.titulo-principal', post.nome_produto);
    atualizarElemento('.intro', post.introducao);
    atualizarElemento('.conteudo-composicao', post.composicao);
    atualizarElemento('.conteudo-combinacoes', post.combinacoes_perigosas);
    atualizarElemento('.conteudo-manipulacao', post.manipulacao);
    atualizarElemento('.conteudo-armazenamento', post.armazenamento);

    atualizarElemento('.introTitulo',"Introdução:");
    atualizarElemento('.composicao',"Composição:");
    atualizarElemento('.combinacao',"Combinação:");
    atualizarElemento('.manipulacao',"Manipulação:");
    atualizarElemento('.armazenamento',"Armazenamento:");

    console.log(post)
}

function atualizarElemento(seletor, valor) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
        // Atualizar o conteúdo e remover a classe skeleton para desativar o efeito de carregamento
        elemento.innerHTML = valor;
        elemento.classList.remove('skeleton');
    }
}

export default show_post;