const url = "https://backqperigo-production.up.railway.app/postagens";
export let postagens = [];

export async function carregarDados() {
    const localData = localStorage.getItem("postagens");
    if (localData) {
        postagens = JSON.parse(localData);
        console.log("Dados carregados do localStorage.");
    } else {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
            const data = await response.json();
            postagens = data.map((postagem) => ({
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
        }
    }
}
