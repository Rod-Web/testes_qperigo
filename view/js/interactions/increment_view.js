export default function increment_view(id_postagem) {

    var url = '../controller/controller_posts.php';

    //Fetch do JSON 
    fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id_postagem:id_postagem})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro: ' + error);
        });
}