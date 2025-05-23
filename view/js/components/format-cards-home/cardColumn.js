import { formatDate } from "./dateFormat.js";

export function cardColumn(data) {

  const cardColumnContainer = document.createElement("div");
  cardColumnContainer.classList.add("card-column-container");
  cardColumnContainer.id = data.id_postagem;  // Alterado para id_postagem

  const imgCard = document.createElement("img");
  imgCard.classList.add("card-img");
  imgCard.src = data.banner;  // Alterado para banner

  cardColumnContainer.appendChild(imgCard);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  cardColumnContainer.appendChild(cardContent);

  // DATE
  const dateBase = document.createElement("div");
  dateBase.classList.add("date-base");

  const iconDate = document.createElement("i");
  iconDate.classList.add("fa-solid");
  iconDate.classList.add("fa-clock");
  iconDate.style.color = "#00d619";

  const date = document.createElement("p");
  date.classList.add("date");
  date.textContent = formatDate(data.data_publicacao);  // Mantido data_publicacao

  const barra = document.createElement("p");
  barra.textContent = "|";

  const pCategoria = document.createElement("p");

  let id_categoria = data.id_categoria;  // Alterado para id_categoria
  let categoria;

  switch (id_categoria) {
    case 1:
      categoria = "Misturas da Internet";
      break;
    case 2:
      categoria = "Mito ou Verdade";
      break;
    case 3:
      categoria = "Misturas Perigosas";
      break;
    case 4:
      categoria = "Usos Errados";
      break;
    case 5:
      categoria = "Produtos de Higiene";
      break;
    default:
      categoria = null;
      break;
  }

  pCategoria.textContent = categoria;

  dateBase.appendChild(iconDate);
  dateBase.appendChild(date);
  dateBase.appendChild(barra);
  dateBase.appendChild(pCategoria);

  // CONTENT
  const title = document.createElement("h3");
  title.classList.add("title");
  title.textContent = data.nome_produto;  // Alterado para nome_produto

  const text = document.createElement("p");
  text.classList.add("text");

  // Limite de caracteres para a descrição
  const maxLength = 150;
  text.innerHTML = data.introducao.length > maxLength  // Alterado para introducao
    ? data.introducao.substring(0, maxLength) + "..."
    : data.introducao;

  const btnView = document.createElement("a");
  btnView.classList.add("btn-view");
  btnView.textContent = "Saiba mais";
  btnView.href = `./conteudo.html?id=${data.id_postagem}`;  // Alterado para id_postagem

  cardContent.appendChild(dateBase);
  cardContent.appendChild(title);
  cardContent.appendChild(text);
  cardContent.appendChild(btnView);

  return cardColumnContainer;
}
